import { Log } from '../LoggingMiddleware/logger.js'
import { v4 as uuidv4 } from 'uuid'

const userdata = {}

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body
    if (!url) {
      await Log("backend", "warn", "handler", "Missing URL in request")
      return res.status(400).json({ error: "URL is required" })
    }

    let code = shortcode || uuidv4().slice(0, 6)

    if (userdata[code]) {
      return res.status(400).json({ error: "Shortcode already exists" })
    }

    const expiry = Date.now() + validity * 60 * 1000 // minutes → ms

    userdata[code] = { url, expiry, clicks: 0 }

    await Log("backend", "info", "handler", `Created short url ${code}`)

    res.status(201).json({
      shortLink: `http://localhost:5000/${code}`,
      expiry: new Date(expiry).toISOString(),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const redirectUrl = async (req, res) => {
  try {
    const { shortcode } = req.params
    const data = userdata[shortcode]

    if (!data) {
      return res.status(404).json({ error: "Shortcode not found" })
    }

    if (Date.now() > data.expiry) {
      return res.status(410).json({ error: "Link expired" })
    }

    data.clicks++
    await Log("backend", "info", "handler", `Redirecting ${shortcode}`)
    return res.redirect(data.url)
  } catch (err) {
    await Log("backend", "error", "handler", `Redirect error: ${err.message}`)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getStats = async (req, res) => {
  try {
    const { shortcode } = req.params
    const data = userdata[shortcode]

    if (!data) {
      return res.status(404).json({ error: "Shortcode not found" })
    }

    res.json({
      url: data.url,
      shortLink: `http://localhost:5000/${shortcode}`,
      expiry: new Date(data.expiry).toISOString(),
      clicks: data.clicks,
    })
  } catch (err) {
    await Log("backend", "error", "handler", `Stats error: ${err.message}`)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

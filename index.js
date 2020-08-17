const remarkableVideo = (md) => {
  const originalLinkOpenRenderer = md.renderer.rules.link_open
  const originalLinkCloseRenderer = md.renderer.rules.link_close

  md.renderer.rules.link_open = (tokens, idx, options, env) => {
    const href = tokens[idx].href

    if (href.startsWith('video:')) {
      env.video = true
      const url = href.split(':')[1]
      return `<video src="${url}" controls>Sorry, your browser doesn't support embedded videos, but don't worry, you can <a href="${url}">download it</a> and watch it with your favorite video player!`
    }

    return originalLinkOpenRenderer(tokens, idx, options, env)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env) => {
    if (env.youtube) {
      env.video = false
      return '</video>'
    }

    return originalLinkCloseRenderer(tokens, idx, options, env)
  }
}

module.exports = remarkableVideo

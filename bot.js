function recognizeTitle (title) {
  const match = title.match(/^\[([^\]]+)]\s*(.*?)\s*$/)
  if (match) {
    match[1] = match[1].toLowerCase()
    if ([
      'submission',
      'transfer',
      'appeal',
      'issue',
      'suggestion'
    ].indexOf(match[1]) !== -1) {
      if (match[1] === 'submission' || match[1] === 'transfer') {
        return {
          type: checkModuleId(match[2]) ? match[1] : 'invalid',
          title: match[2]
        }
      }
      return {
        type: match[1],
        title: match[2]
      }
    }
  }
  return {
    type: '',
    title
  }
}

function checkModuleId (moduleId) {
  // moduleId must match pattern: ^[a-zA-Z][a-zA-Z0-9._-]+$
  if (!moduleId.match(/^[a-zA-Z][a-zA-Z0-9._-]+$/)) return false

  // Blacklist check
  const blacklist = ['com.android', 'com.google', 'org.lsposed', 'io.github.lsposed', 'org.kernelsu', 'io.github.kernelsu']
  for (const item of blacklist) {
    if (moduleId.toLowerCase().startsWith(item)) return false
  }

  // Disallow 'example' in moduleId
  if (moduleId.toLowerCase().includes('example')) return false

  return true
}

module.exports = {
  recognizeTitle
}

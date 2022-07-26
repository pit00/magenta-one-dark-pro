const fs = require('fs')
const tokenColors = require('Material-theme/themes/OneDark-Pro-bold.json').tokenColors
const workbenchThemes = [
  {
    id: 'mirage',
    name: 'Mirage',
    colors: require('ayu/ayu-mirage.json').colors
  },
  {
    id: 'mirage-bordered',
    name: 'Mirage Bordered',
    colors: require('ayu/ayu-mirage-bordered.json').colors
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: require('ayu/ayu-dark.json').colors
  },
  {
    id: 'dark-bordered',
    name: 'Dark Bordered',
    colors: require('ayu/ayu-dark-bordered.json').colors
  }
]

// begin syntax edits
const jsVarColors = tokenColors.find(e => e.name === 'js variable readwrite')
jsVarColors.scope = jsVarColors.scope.split(',').filter(s => s !== 'meta.object-literal.key').join()
tokenColors.push({
    name: 'js object key',
    scope: 'meta.object-literal.key',
    settings: {
      foreground: '#56b6c2'
    }
})
tokenColors.find(e => e.name === 'Attribute IDs').settings.fontStyle = ''
tokenColors.find(e => e.name === 'Attribute class').settings.fontStyle = ''
// end syntax edits

for (let { id, name, colors } of workbenchThemes) {
  // begin workbench edits
  colors['editorGroup.emptyBackground'] = colors['editorGroup.background']
  colors['editorGroup.background'] = undefined
  colors['gitDecoration.conflictingResourceForeground'] = colors['gitDecoration.deletedResourceForeground']
  
  colors = replaceColor("#e6b450", "#e65050", colors);
  colors = replaceColor("#e1af4b", "#e14b4b", colors);

  colors = replaceColor("#ffcc66", "#ff6666", colors);
  colors = replaceColor("#fac761", "#fa6161", colors);

  // end workbench edits
  const theme = {
    name: `Red One Dark Pro | ${name}`,
    type: 'dark',
    colors,
    tokenColors
  }
  const themeJSON = JSON.stringify(theme, '', 2)
  fs.writeFileSync(`./themes/red-one-dark-pro-${id}-color-theme.json`, themeJSON)
}

function replaceColor(originalColor, newColor, object) {
  if (typeof object == "string") {
    if (object.startsWith(originalColor))
      return newColor + object.substring(newColor.length);

    return object;
  } else if (typeof object != "object")
    return object;
  
  if (object instanceof Array) {
    return object.map(item => replaceColor(originalColor, newColor, item));
  } else if (object instanceof Object) {
    let newObject = {};

    for (const key in object) {
      newObject[key] = replaceColor(originalColor, newColor, object[key]);
    }

    return newObject;
  } else
    return object;
}
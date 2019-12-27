figma.showUI(__html__, { width: 280, height: 385 });

let colorSylesArr = [],
    colorStyles = figma.getLocalPaintStyles();

for (var i = 0; i < colorStyles.length; i++) {
  let colorStyle = figma.getStyleById(colorStyles[i].id);
  colorSylesArr.push({id: colorStyle.id, name: colorStyle.name});
}
figma.ui.postMessage(colorSylesArr);

figma.ui.onmessage = msg => {
  if (msg.type === 'switch-color') {

    Promise.all(figma.currentPage.selection.map(selected => invertIfApplicable(
        selected,
        msg.oldcolor,
        msg.newcolor,
        msg.colorstyle,
        msg.fill,
        msg.stroke,
        msg.rectangle,
        msg.ellipse,
        msg.polygon,
        msg.vector,
        msg.text
    )))
  }

  figma.closePlugin();
};


async function invertIfApplicable(node, oldcolor, newcolor, colorstyle, fill, stroke, rectangle, ellipse, polygon, vector, text) {
  const els = node.findAll();
  let fillStyleId = '',
      strokeStyleId = '';
  if(colorstyle){
    let colorStyle = figma.getStyleById(colorstyle);
    if(colorStyle && colorStyle.paints && colorStyle.paints.length > 0) {
      newcolor = {
        b: colorStyle.paints[0].color.b,
        g: colorStyle.paints[0].color.g,
        r: colorStyle.paints[0].color.r
      };
      if(fill) { fillStyleId = colorStyle.id; }
      if(stroke) { strokeStyleId = colorStyle.id; }
    }
  }
  
  for (let el of els) {
    switch (el.type) {
      case 'RECTANGLE':
      {
        if(rectangle){
          if(fill){
            let newFills = switchColorFills(el,oldcolor,newcolor);
            if(JSON.stringify(newFills) !== JSON.stringify(el.fills)){
              el.fills = newFills;
              el.fillStyleId = fillStyleId;
            }
          }
          if(stroke) {
            let newStrokes = switchColorStrokes(el,oldcolor,newcolor);
            if(JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
              el.strokes = newStrokes;
              el.strokeStyleId = strokeStyleId;
            }
          }
        }

        break
      }
      case 'ELLIPSE':
      {
        if(ellipse){
          if(fill){
            let newFills = switchColorFills(el,oldcolor,newcolor);
            if(JSON.stringify(newFills) !== JSON.stringify(el.fills)){
              el.fills = newFills;
              el.fillStyleId = fillStyleId;
            }
          }
          if(stroke) {
            let newStrokes = switchColorStrokes(el,oldcolor,newcolor);
            if(JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
              el.strokes = newStrokes;
              el.strokeStyleId = strokeStyleId;
            }
          }
        }
        break
      }
      case 'POLYGON':
      {
        if(polygon) {
          if(fill){
            let newFills = switchColorFills(el,oldcolor,newcolor);
            if(JSON.stringify(newFills) !== JSON.stringify(el.fills)){
              el.fills = newFills;
              el.fillStyleId = fillStyleId;
            }
          }
          if(stroke) {
            let newStrokes = switchColorStrokes(el,oldcolor,newcolor);
            if(JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
              el.strokes = newStrokes;
              el.strokeStyleId = strokeStyleId;
            }
          }
        }
        break
      }
      case 'STAR':
      {
        if(star) {
          if(fill){
            let newFills = switchColorFills(el,oldcolor,newcolor);
            if(JSON.stringify(newFills) !== JSON.stringify(el.fills)){
              el.fills = newFills;
              el.fillStyleId = fillStyleId;
            }
          }
          if(stroke) {
            let newStrokes = switchColorStrokes(el,oldcolor,newcolor);
            if(JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
              el.strokes = newStrokes;
              el.strokeStyleId = strokeStyleId;
            }
          }
        }

        break
      }
      case 'VECTOR':
      {
        if(vector) {
          if(fill){
            let newFills = switchColorFills(el,oldcolor,newcolor);
            if(JSON.stringify(newFills) !== JSON.stringify(el.fills)){
              el.fills = newFills;
              el.fillStyleId = fillStyleId;
            }
          }
          if(stroke) {
            let newStrokes = switchColorStrokes(el,oldcolor,newcolor);
            if(JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
              el.strokes = newStrokes;
              el.strokeStyleId = strokeStyleId;
            }
          }
        }

        break
      }
      case 'TEXT':
      {
        if(text){
          if(fill){
            let newFills = switchColorFills(el,oldcolor,newcolor);
            if(JSON.stringify(newFills) !== JSON.stringify(el.fills)){
              el.fills = newFills;
              el.fillStyleId = fillStyleId;
            }
          }
          if(stroke) {
            let newStrokes = switchColorStrokes(el,oldcolor,newcolor);
            if(JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
              el.strokes = newStrokes;
              el.strokeStyleId = strokeStyleId;
            }
          }
        }
        break
      }

      default:
      {
        // not supported, silently do nothing
      }
    }
  }
}

function switchColorFills(el,oldcolor,newcolor) {

  let newFills = [];
  for (let paint of el.fills) {
    if (paint.type == "SOLID" &&
        paint.color.b.toFixed(2) == oldcolor.b.toFixed(2) &&
        paint.color.g.toFixed(2) == oldcolor.g.toFixed(2) &&
        paint.color.r.toFixed(2) == oldcolor.r.toFixed(2)) {
      let newPaint = JSON.parse(JSON.stringify(paint));
      newPaint.color = {
        'b': Number(newcolor.b),
        'g': Number(newcolor.g),
        'r': Number(newcolor.r)
      };
      newFills.push(newPaint);
    } else {
      newFills.push(paint);
    }
  }

  return newFills
}

function switchColorStrokes(el,oldcolor,newcolor) {

  let newStrokes = [];
  for (let paint of el.strokes) {
    if (paint.type == "SOLID" &&
        paint.color.b.toFixed(2) == oldcolor.b.toFixed(2) &&
        paint.color.g.toFixed(2) == oldcolor.g.toFixed(2) &&
        paint.color.r.toFixed(2) == oldcolor.r.toFixed(2)) {
      let newPaint = JSON.parse(JSON.stringify(paint));
      newPaint.color = {
        'b': Number(newcolor.b),
        'g': Number(newcolor.g),
        'r': Number(newcolor.r)
      };
      newStrokes.push(newPaint);
    } else {
      newStrokes.push(paint);
    }
  }

  return newStrokes
}


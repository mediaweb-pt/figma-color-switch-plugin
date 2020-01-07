var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
figma.showUI(__html__, { width: 280, height: 385 });
let colorSylesArr = [], colorStyles = figma.getLocalPaintStyles();
for (var i = 0; i < colorStyles.length; i++) {
    let colorStyle = figma.getStyleById(colorStyles[i].id);
    colorSylesArr.push({ id: colorStyle.id, name: colorStyle.name });
}
figma.ui.postMessage(colorSylesArr);
figma.ui.onmessage = msg => {
    if (msg.type === 'switch-color') {
        if (figma.currentPage.selection.length > 0) {
            Promise.all(figma.currentPage.selection.map(selected => switchIfApplicable(selected, msg.oldcolor, msg.newcolor, msg.colorstyle, msg.fill, msg.stroke, msg.rectangle, msg.ellipse, msg.polygon, msg.vector, msg.text)));
        }
        else {
            Promise.all(figma.currentPage.children.map(childs => switchIfApplicable(childs, msg.oldcolor, msg.newcolor, msg.colorstyle, msg.fill, msg.stroke, msg.rectangle, msg.ellipse, msg.polygon, msg.vector, msg.text)));
        }
    }
    figma.closePlugin();
};
function switchIfApplicable(node, oldcolor, newcolor, colorstyle, fill, stroke, rectangle, ellipse, polygon, vector, text) {
    return __awaiter(this, void 0, void 0, function* () {
        let els = [], fillStyleId = '', strokeStyleId = '';
        if (typeof node.findAll === 'function') {
            els = node.findAll();
        }
        else if (typeof node === 'object' && node.type) {
            els[0] = node;
        }
        if (colorstyle) {
            let colorStyle = figma.getStyleById(colorstyle);
            if (colorStyle && colorStyle.paints && colorStyle.paints.length > 0) {
                newcolor = {
                    b: colorStyle.paints[0].color.b,
                    g: colorStyle.paints[0].color.g,
                    r: colorStyle.paints[0].color.r
                };
                if (fill) {
                    fillStyleId = colorStyle.id;
                }
                if (stroke) {
                    strokeStyleId = colorStyle.id;
                }
            }
        }
        for (let el of els) {
            switch (el.type) {
                case 'RECTANGLE':
                    {
                        if (rectangle) {
                            if (fill) {
                                let newFills = switchColorFills(el, oldcolor, newcolor);
                                if (JSON.stringify(newFills) !== JSON.stringify(el.fills)) {
                                    el.fills = newFills;
                                    el.fillStyleId = fillStyleId;
                                }
                            }
                            if (stroke) {
                                let newStrokes = switchColorStrokes(el, oldcolor, newcolor);
                                if (JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
                                    el.strokes = newStrokes;
                                    el.strokeStyleId = strokeStyleId;
                                }
                            }
                        }
                        break;
                    }
                case 'ELLIPSE':
                    {
                        if (ellipse) {
                            if (fill) {
                                let newFills = switchColorFills(el, oldcolor, newcolor);
                                if (JSON.stringify(newFills) !== JSON.stringify(el.fills)) {
                                    el.fills = newFills;
                                    el.fillStyleId = fillStyleId;
                                }
                            }
                            if (stroke) {
                                let newStrokes = switchColorStrokes(el, oldcolor, newcolor);
                                if (JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
                                    el.strokes = newStrokes;
                                    el.strokeStyleId = strokeStyleId;
                                }
                            }
                        }
                        break;
                    }
                case 'POLYGON':
                    {
                        if (polygon) {
                            if (fill) {
                                let newFills = switchColorFills(el, oldcolor, newcolor);
                                if (JSON.stringify(newFills) !== JSON.stringify(el.fills)) {
                                    el.fills = newFills;
                                    el.fillStyleId = fillStyleId;
                                }
                            }
                            if (stroke) {
                                let newStrokes = switchColorStrokes(el, oldcolor, newcolor);
                                if (JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
                                    el.strokes = newStrokes;
                                    el.strokeStyleId = strokeStyleId;
                                }
                            }
                        }
                        break;
                    }
                case 'STAR':
                    {
                        if (star) {
                            if (fill) {
                                let newFills = switchColorFills(el, oldcolor, newcolor);
                                if (JSON.stringify(newFills) !== JSON.stringify(el.fills)) {
                                    el.fills = newFills;
                                    el.fillStyleId = fillStyleId;
                                }
                            }
                            if (stroke) {
                                let newStrokes = switchColorStrokes(el, oldcolor, newcolor);
                                if (JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
                                    el.strokes = newStrokes;
                                    el.strokeStyleId = strokeStyleId;
                                }
                            }
                        }
                        break;
                    }
                case 'VECTOR':
                    {
                        if (vector) {
                            if (fill) {
                                let newFills = switchColorFills(el, oldcolor, newcolor);
                                if (JSON.stringify(newFills) !== JSON.stringify(el.fills)) {
                                    el.fills = newFills;
                                    el.fillStyleId = fillStyleId;
                                }
                            }
                            if (stroke) {
                                let newStrokes = switchColorStrokes(el, oldcolor, newcolor);
                                if (JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
                                    el.strokes = newStrokes;
                                    el.strokeStyleId = strokeStyleId;
                                }
                            }
                        }
                        break;
                    }
                case 'TEXT':
                    {
                        if (text) {
                            if (fill) {
                                let newFills = switchColorFills(el, oldcolor, newcolor);
                                if (JSON.stringify(newFills) !== JSON.stringify(el.fills)) {
                                    el.fills = newFills;
                                    el.fillStyleId = fillStyleId;
                                }
                            }
                            if (stroke) {
                                let newStrokes = switchColorStrokes(el, oldcolor, newcolor);
                                if (JSON.stringify(newStrokes) !== JSON.stringify(el.fills)) {
                                    el.strokes = newStrokes;
                                    el.strokeStyleId = strokeStyleId;
                                }
                            }
                        }
                        break;
                    }
                default:
                    {
                    }
            }
        }
    });
}
function switchColorFills(el, oldcolor, newcolor) {
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
        }
        else {
            newFills.push(paint);
        }
    }
    return newFills;
}
function switchColorStrokes(el, oldcolor, newcolor) {
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
        }
        else {
            newStrokes.push(paint);
        }
    }
    return newStrokes;
}

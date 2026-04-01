const spiralArc = (fromRadius, toRadius, width, fromAngle, toAngle) => {
  const x1 = fromRadius * Math.sin(fromAngle);
  const y1 = fromRadius * -Math.cos(fromAngle);
  const x2 = (fromRadius + width) * Math.sin(fromAngle);
  const y2 = (fromRadius + width) * -Math.cos(fromAngle);
  const x3 = toRadius * Math.sin(toAngle);
  const y3 = toRadius * -Math.cos(toAngle);
  const x4 = (toRadius + width) * Math.sin(toAngle);
  const y4 = (toRadius + width) * -Math.cos(toAngle);
  return `
    M ${x1},${y1} 
    L ${x2},${y2} 
    A ${fromRadius},${fromRadius} 1 0 1 ${x4},${y4} 
    L ${x3},${y3}
    A ${fromRadius},${fromRadius} 0 0 0 ${x1},${y1}`;
}

const svg = d3.select('svg');
const g = svg.append('g')
    .attr('transform', 'translate(300,300)')

const WIDTH = 10;
const BASE_RADIUS = 30;
const angle = Math.PI * 2 / 30;
for (let index = 0; index < 100; index++) {
  const fromAngle = angle * index;
  const toAngle = angle * (index + 1);
  for (let level = 0; level < 5; level++) {
    const fromRadius = BASE_RADIUS + index * 2 + WIDTH * level;
    const toRadius = BASE_RADIUS + (index + 1) * 2 + WIDTH * level;
    const path = spiralArc (fromRadius, toRadius, WIDTH, fromAngle, toAngle);
    const color = `rgb(0,${192 + Math.random() * 64},255)`
    g.append('path').attr('d', path).style('fill', color)
  }
}
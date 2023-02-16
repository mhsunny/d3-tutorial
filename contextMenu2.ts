import * as d3 from 'd3';

export const menuFactory = (x, y, menuItems, data, svgId) => {
  d3.select('.contextMenu').remove();
console.log(d3.select(`${svgId} svg g.node`));
console.log(data);

  // Draw the menu
  d3.select(`${svgId} svg`)
      .append('g').attr('class', 'contextMenu')
      .selectAll('tmp')
      .data(menuItems).enter()
      .append('g').attr('class', 'menuEntry')
      .style('fill','#ffffff')
      .style('stroke','#00557d')
      .style({'cursor': 'pointer'});


  // Draw menu entries
  d3.selectAll('.menuEntry')
      .append('rect')
      .attr('x', x)
      .attr('y', (d, i) => { return y + (i * 30); })
      .attr('rx', 2)
      .attr('width', 150)
      .attr('height', 30)
      .style('cursor', 'pointer')
      .on('click', (d) => { d.action(data) });

  d3.selectAll('.menuEntry')
      .append('text')
      .text((d) => { return d.title; })
      .attr('x', x)
      .attr('y', (d, i) => { return y + (i * 30); })
      .attr('dy', 20)
      .attr('dx', 45)
      .style('font-size','12px')
      .style('cursor', 'pointer')
      .style('stroke','#00557d')
      .on('click', (d) => { d.action(data) });

  // Other interactions
  d3.select(svgId + ` svg`)
      .on('click', () => {
          d3.select('.contextMenu').remove();
      });
}

export const createContextMenu = (d, menuItems, width, height, svgId) => {
  menuFactory(d3.event.pageX - width / 2, d3.event.pageY - height / 1.5, menuItems, d, svgId);
  d3.event.preventDefault();
}

import { createContextMenu } from './../../shared/util/contextMenu';
import { AlertService } from './../../shared/alert.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { colorScale } from 'src/assets/model/graphcolor';
import * as d3 from 'd3';
import contextMenuFactory from 'd3-context-menu';


const margin = {
  top: 30,
  right: 80,
  bottom: 5,
  left: 5
}

const width = 1000;
const height = 1000;

@Component({
  selector: 'app-network-graph2',
  templateUrl: './network-graph2.component.html',
  styleUrls: ['./network-graph2.component.scss']
})

export class NetworkGraph2Component implements OnInit {
//create some data
private _myJson = "assets/model/graph-data.json";

dataset2: any =  {
  nodes: [
        {id: 1, name: 'AGGR', label: 'Aggregation', group: 'Team C', runtime: 20},
        {id: 2, name: 'ASMT', label: 'Assessment Repository', group: 'Team A', runtime: 60},
        {id: 3, name: 'CALC', label: 'Final Calc', group: 'Team C', runtime: 30},
        {id: 4, name: 'DEMO', label: 'Demographic', group: 'Team B', runtime: 40},
        {id: 5, name: 'ELIG', label: 'Eligibility', group: 'Team B', runtime: 20},
        {id: 6, name: 'GOAL', label: 'Goal Setting', group: 'Team C', runtime: 60},
        {id: 7, name: 'GROW', label: 'Growth Model', group: 'Team C', runtime: 60},
        {id: 8, name: 'LINK', label: 'Linkage', group: 'Team A', runtime: 0},
        {id: 9, name: 'MOSL', label: 'MOSL', group: 'Team A', runtime: 80},
        {id: 10, name: 'MOTP', label: 'MOTP', group: 'Team A', runtime: 20},
        {id: 11, name: 'REPT', label: 'Reporting', group: 'Team E', runtime: 200},
        {id: 12, name: 'SEDD', label: 'State Data', group: 'Team A', runtime: 30},
        {id: 13, name: 'SNAP', label: 'Snapshot', group: 'Team A', runtime: 40}
	],
  links: [
    {source: 1, target: 3, type: 'Next -->>'},
    {source: 6, target: 1, type: 'Next -->>'},
    {source: 7, target: 1, type: 'Next -->>'},
    {source: 9, target: 1, type: 'Next -->>'},
    {source: 2, target: 4, type: 'Next -->>'},
    {source: 2, target: 6, type: 'Next -->>'},
    {source: 2, target: 7, type: 'Next -->>'},
    {source: 2, target: 8, type: 'Next -->>'},
    {source: 2, target: 9, type: 'Next -->>'},
    {source: 10, target: 3, type: 'Next -->>'},
    {source: 3, target: 11, type: 'Next -->>'},
    {source: 8, target: 5, type: 'Go to ->>'},
    {source: 8, target: 11, type: 'Go to ->>'},
    {source: 6, target: 9, type: 'Go to ->>'},
    {source: 7, target: 9, type: 'Go to ->>'},
    {source: 8, target: 9, type: 'Go to ->>'},
    {source: 9, target: 11, type: 'Go to ->>'},
    {source: 12, target: 9, type: 'Go to ->>'},
    {source: 13, target: 11, type: 'Go to ->>'},
    {source: 13, target: 2, type: 'Go to ->>'},
    {source: 13, target: 4, type: 'This way>>'},
    {source: 13, target: 5, type: 'This way>>'},
    {source: 13, target: 8, type: 'This way>>'},
    {source: 13, target: 9, type: 'This way>>'},
    {source: 13, target: 10, type: 'This way>>'},
    {source: 4, target: 7, type: 'Next -->>'},
    {source: 4, target: 2, type: 'Next -->>'}
  ]
};
dataset: any =  {
  nodes: [
    {id: 1, name: 'Manchester City', label: 'Manchester City', group: 'Team A', description: ''},
    {id: 2, name: 'John Stones', label: 'John Stones', group: 'Team C', description: ''},
    {id: 3, name: 'Rodrigo', label: 'Rodrigo', group: 'Team C', description: ''},
    {id: 4, name: 'Sergio Aguero', label: 'Sergio Aguero', group: 'Team C', description: ''},
    {id: 5, name: 'Bernardo Silva', label: 'Bernardo Silva', group: 'Team C', description: ''},
    {id: 6, name: 'Kyle Walker', label: 'Kyle Walker', group: 'Team C', description: ''},
    {id: 7, name: 'Aymeric Laporte', label: 'Aymeric Laporte', group: 'Team C', description: ''},
    {id: 8, name: 'Phil Foden', label: 'Phil Foden', group: 'Team C', description: ''},
    {id: 9, name: 'Benjamin Mendy', label: 'Benjamin Mendy', group: 'Team C', description: ''},
    {id: 10, name: 'Kevin De Bruyne', label: 'Kevin De Bruyne', group: 'Team C', description: ''},
    {id: 11, name: 'Scott Carson', label: 'Scott Carson', group: 'Team C', description: ''},
    {id: 12, name: 'Rúben Alves Dias', label: 'Rúben Alves Dias', group: 'Team C', description: ''},
    {id: 13, name: 'Kalvin Phillips', label: 'Kalvin Phillips', group: 'Team C', description: ''},
    {id: 14, name: 'Riyad Mahrez', label: 'Riyad Mahrez', group: 'Team C', description: ''},
    {id: 15, name: 'Nathan Aké', label: 'Nathan Aké', group: 'Team C', description: ''},
    {id: 16, name: 'João Cancelo', label: 'João Cancelo', group: 'Team C', description: ''},
    {id: 17, name: 'Fernandinho', label: 'Fernandinho', group: 'Team C', description: ''},
    {id: 18, name: 'IIkay Gündogan', label: 'IIkay Gündogan', group: 'Team C', description: ''},
    {id: 19, name: 'Jack Grealish', label: 'Jack Grealish', group: 'Team C', description: ''},
    {id: 20, name: 'Zack Steffen', label: 'Zack Steffen', group: 'Team C', description: ''},
    {id: 21, name: 'Ederson', label: 'Ederson', group: 'Team C', description: ''},
    {id: 22, name: 'Football', label: 'Football', group: 'Team D', description: ''},
    {id: 23, name: 'Brazil', label: 'Brazil', group: 'Team B', description: ''},
    {id: 24, name: 'Goalkeeper', label: 'Goalkeeper', group: 'Team E', description: ''},
    {id: 25, name: 'Alisson Backer', label: 'Alisson Backer', group: 'Team C', description: ''},
    {id: 26, name: 'Tomas', label: 'Tomas', group: 'Team C', description: ''},
    {id: 27, name: 'Aston', label: 'Aston', group: 'Team C', description: ''},
    {id: 28, name: 'Neil', label: 'Neil', group: 'Team C', description: ''},
    {id: 29, name: 'Tyrone', label: 'Tyrone', group: 'Team C', description: ''},
    {id: 30, name: 'Matty', label: 'Matty', group: 'Team C', description: ''},
  ],
  links: [
    {source: 2, target: 1, type: 'Team', distance: 200},
    {source: 3, target: 1, type: 'Team', distance: 200},
    {source: 4, target: 1, type: 'Team', distance: 200},
    {source: 5, target: 1, type: 'Team', distance: 200},
    {source: 6, target: 1, type: 'Team', distance: 200},
    {source: 7, target: 1, type: 'Team', distance: 200},
    {source: 8, target: 1, type: 'Team', distance: 200},
    {source: 9, target: 1, type: 'Team', distance: 200},
    {source: 10, target: 1, type: 'Team', distance: 200},
    {source: 11, target: 1, type: 'Team', distance: 200},
    {source: 12, target: 1, type: 'Team', distance: 200},
    {source: 13, target: 1, type: 'Team', distance: 200},
    {source: 14, target: 1, type: 'Team', distance: 200},
    {source: 15, target: 1, type: 'Team', distance: 200},
    {source: 16, target: 1, type: 'Team', distance: 200},
    {source: 17, target: 1, type: 'Team', distance: 200},
    {source: 18, target: 1, type: 'Team', distance: 200},
    {source: 19, target: 1, type: 'Team', distance: 200},
    {source: 20, target: 1, type: 'Team', distance: 200},
    {source: 21, target: 1, type: 'Team', distance: 200},
    {source: 22, target: 1, type: 'Country', distance: 200},
    {source: 21, target: 23, type: 'Country', distance: 100},
    {source: 21, target: 24, type: 'Position', distance: 20},
    {source: 26, target: 24, type: 'Position', distance: 20},
    {source: 25, target: 24, type: 'Position', distance: 100},
    {source: 26, target: 27, type: 'Team', distance: 100},
    {source: 28, target: 27, type: 'Team', distance: 100},
    {source: 29, target: 27, type: 'Team', distance: 100},
    {source: 30, target: 27, type: 'Team', distance: 100},
  ]
}
// dataset: any;
  svg: any;
  link:any;
  edgepaths: any;
  edgelabels: any;
  node: any;
  legend_g: any;
  legend_g2: any;
  simulation: any;
  nodeData: any = {
    name: '',
    description: '',
    group: '',
  }
  slideClass: any = 'hideMe';
  dataSetData: any;
  contextMenu = contextMenuFactory(d3);
  menu = [
    {
      title: 'First action',
      action: (d) => {
        // TODO: add any action you want to perform
        console.log(d);
      }
    },
    {
      title: 'Second action',
      action: (d) => {
        // TODO: add any action you want to perform
        console.log(d);
      }
    }
  ]
  constructor(private alertService: AlertService, private http: HttpClient) {

  }
  getFilterData() {
    this.http.get(this._myJson).subscribe((myJsonData) => {
    this.dataset = myJsonData['dataset'];
    console.log(this.dataset);

    });
  }
  // colorScale = d3.scaleOrdinal() //=d3.scaleOrdinal(d3.schemeSet2)
  //   .domain(["Team A", "Team B", "Team C", "Team D", "Team E"])
  //   .range(['#ff9e6d', '#86cbff', '#c2e5a0','#fff686','#9e79db']);



  ngOnInit(): void {
    // this.getFilterData();
    // console.log(this.dataset);

    this.svg = d3.select('.nodediv2')
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style('border','1px solid')
        .call(d3.zoom().on("zoom", this.zoomed))
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    this.setLinks();
    this.setEdgepaths();
    this.setEdgelabels();
    this.setNode();


    this.svg.append('defs').append('marker')
    .attr("id",'arrowhead')
    .attr('viewBox','-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
      .attr('refX',function(d) {
        console.log();

        // return d.nodes[] + 10;   // Add the marker's width
     }) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
      .attr('refY',0)
      .attr('orient','auto')
        .attr('markerWidth',5)
        .attr('markerHeight',5)
        .attr('xoverflow','visible')
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke','none');


      this.simulation = d3.forceSimulation(this.dataset.nodes)
      .force(
        'link',
        d3.forceLink(this.dataset.links).id((d: any) => d.id)
        // .distance(link => link.distance)
      )
      .force('charge', d3.forceManyBody().strength(-(width)))
      .force('center', d3.forceCenter(width / 2, 550))
      .force("collide",d3.forceCollide().radius(d => d.r * 10))
      .force('x', d3.forceX(150).strength(0.1))
      .force('y', d3.forceY(150).strength(0.1))
      .tick()
      .on('tick', () => {
        this.node.attr('transform', (n: any) => 'translate(' + n.x + ',' + n.y + ')');
        this.link
          .attr('x1', (l: any) => l.source.x)
          .attr('y1', (l: any) => l.source.y)
          .attr('x2', (l: any) => l.target.x)
          .attr('y2', (l: any) => l.target.y);

        this.node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);

        this.edgepaths.attr('d', (d: any) => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
      });
    //drawing the legend
    this.legend_g = this.svg.selectAll(".legend")
    .data(colorScale.domain())
    .enter().append("g")
    .attr("transform", (d: any, i: any) => `translate(${width-100},${i * 20})`);

    //drawing the second legend
    this.legend_g2 = this.svg.append("g")
    //.attr("transform", (d, i) => `translate(${width},${i * 20})`);
    .attr("transform", `translate(${width-100}, 120)`);





    this.node.append("circle")
    .attr("r", (d: any) => 17)//+ d.runtime/20 )
    .style("stroke", "grey")
    .style("stroke-opacity",0.3)
    .style('cursor', 'pointer')
    .style("stroke-width", (d: any) => d.runtime/10).style("fill", (d: any) => colorScale(d.group));



    // this.svg.selectAll('circles')
    // .attr('r', 30)
    // .attr('fill', 'steelblue')
    // .attr('cx', (d) => {
    //   return 100;
    // })
    // .attr('cy', (d) => {
    //   return d * 100;
    // })
    // .on('contextmenu', (d) => {
    //   createContextMenu(d, this.menu, width, height, '#nodediv2');
    // });

    this.node.append("title")
    .text((d: any) => d.id + ": " + d.label + " - " + d.group);

    this.node.append("text")
        .attr("dy", 25)
        .attr('font-size', 12)
        .attr("text-anchor", 'middle')
        .attr("alignment-baseline", 'middle')
        .text((d: any) => d.name);

    this.legend_g.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", colorScale);

    this.legend_g.append("text")
      .attr("x", 10)
      .attr("y", 5)
      .text((d: any) => d);



    this.legend_g2.append("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", 0)
      .style("stroke", "grey")
      .style("stroke-opacity",0.3)
      .style("stroke-width", 15)
      .style("fill", "black")
    this.legend_g2.append("text")
       .attr("x",15)
       .attr("y",0)
       .text("Long Runtime");

      this.legend_g2.append("circle")
      .attr("r", 5)
      .attr("cx", 0)
      .attr("cy", 20)
      .style("stroke", "grey")
      .style("stroke-opacity",0.3)
      .style("stroke-width", 2)
      .style("fill", "black")
    this.legend_g2.append("text")
       .attr("x",10)
       .attr("y",25)
       .text("Short Runtime");

    // this.svg.selectAll(".nodes")
    console.log(this.svg
      .selectAll('circle'));

    this.svg
    .selectAll('circle').on('contextmenu', (d) => {
        createContextMenu(d, this.menu, width, height, '.nodediv2');
    });
  }
  dragstarted(d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();//sets the current target alpha to the specified number in the range [0,1].
    d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
    d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
}

//When the drag gesture starts, the targeted node is fixed to the pointer
dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

//the targeted node is released when the gesture ends
//   dragended(d) {
//     if (!d3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;

//     console.log("dataset after dragged is ...",dataset);
//   }

setLinks() {
  console.log(this.dataset);

    this.link = this.svg.selectAll(".links")
      .data(this.dataset.links)
      .enter()
      .append("line")
      .attr("class", "links")
      .on('mouseover', (e: any) => {this.nodeData = e; this.slideClass = 'animateMe'})
      .style("stroke", "#999")
      .style("stroke-width", "1px")
      .style("stroke-opacity", "0.6")
      .attr('marker-end','url(#arrowhead)');
    this.link.append("title")
      .text((d: any) => d.type);
}

setNode() {
      this.node = this.svg
      .append('g')
      .selectAll('g')
      .data(this.dataset.nodes)
      .enter()
      .append('g')
      .attr('class', 'nodes')
    // .on('mouseover', (e: any) => {d3.select(e).style("stroke", "#999");})
    .call(d3.drag() //sets the event listener for the specified typenames and returns the drag behavior.
        .on("start", d => this.dragstarted(d, this.simulation)) //start - after a new pointer becomes active (on mousedown or touchstart).
        .on("drag", this.dragged)      //drag - after an active pointer moves (on mousemove or touchmove).
        //.on("end", dragended)     //end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
    );


  }
  zoomed() {
    d3.select('svg g').attr("transform", d3.event.transform)
  }
  setEdgepaths() {
    this.edgepaths = this.svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
        .data(this.dataset.links)
        .enter()
        .append('path')
        .attr('class', 'edgepath')
        .attr('fill-opacity', 0)
        .attr('fill', '#aaa')
        .attr('stroke-opacity', 0)
        .attr('id', function (d: any, i: any) {return 'edgepath' + i})
        .style("pointer-events", "none");
  }

  setEdgelabels() {
    this.edgelabels = this.svg.selectAll(".edgelabel")
        .data(this.dataset.links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edgelabel')
        .attr("dy", 8)
        .attr('id', function (d: any, i: any) {return 'edgelabel' + i})
        .attr('font-size', 10)
        .attr('fill', '#aaa');
    this.edgelabels.append('textPath') //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
        .attr('xlink:href', function (d: any, i: any) {return '#edgepath' + i})
        .style("text-anchor", "middle")
        .style("padding", 2)
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text((d: any) => d.type);
  }
}

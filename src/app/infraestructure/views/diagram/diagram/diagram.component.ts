import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as plantumlEncoder from 'plantuml-encoder';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnChanges {

  @Input() diagramUml: string = "";
  imgPlantuml: any = "";

  constructor(private domSanitazer: DomSanitizer) {
    this.imgPlantuml = this.domSanitazer.bypassSecurityTrustHtml("");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.diagramUml != "") {
      console.log("Cambiando modelo --> " + this.diagramUml)
      let encodedUML: string = plantumlEncoder.encode(this.diagramUml);
      this.imgPlantuml = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;
   }
  }

}

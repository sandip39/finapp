import { Component, ViewChild, AfterViewInit, OnInit,ElementRef } from '@angular/core';
import { jqxDockPanelComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdockpanel';
import { jqxComboBoxComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { jqxGridComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'; 


import {ViewService} from '../_services/view.service';
import { User } from '../_models/index';

 
@Component({
    moduleId: module.id,
    templateUrl: './viewscreen.component.html',
})
 
export class ViewScreenComponent  implements AfterViewInit {
	@ViewChild('jqxDockPanel') DockPanel: jqxDockPanelComponent;
	@ViewChild('myComboBox') myComboBox: jqxComboBoxComponent;
	@ViewChild('myGrid') myGrid: jqxGridComponent;
	@ViewChild('first') firstElement: ElementRef;
    	@ViewChild('second') secondElement: ElementRef;
    	@ViewChild('third') thirdElement: ElementRef;
	currentUser : User;


	source: any =
        {
                datatype: 'json',
                datafields:
                [
                        {name: '_id', type: 'string'},
			{name: 'group', type: 'string'}
                ],
		url: '../users/view/dropdowninfo'
        };


        dataAdapter: any = new jqx.dataAdapter(this.source, {
		beforeSend: function (jqXHR, settings) {
			//console.log(jqXHR);
			//console.log(settings);
			this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
			//console.log(this.currentUser);
			var token = "Bearer " + this.currentUser.token;			
            		jqXHR.setRequestHeader('Authorization', token);
        	},
		beforeLoadComplete: function (data) {
                    var groupSource = [];
                    for (var i = 0; i < data.length; i++) {
                        groupSource.push({ _id: data[i]._id, group: data[i].group });
                    }
                    return groupSource;
                }

	});

	portfolioviewbaseurl = '../users/view/portfolioinfo/'
	portfolioviewurl = this.portfolioviewbaseurl + 'dummy'
	
	sourcegrid: any =
        {
                datatype: 'json',
                datafields:
                [
                        {name: '_id', type: 'string'},
			{name: 'lastDate', type: 'string'},
			{name: 'lastTime', type: 'string'},
			{name: 'lastVolume', type: 'string'},
                        {name: 'lastClose', type: 'string'},
			{name: 'Symbol', type: 'string'},
			{name: 'NumberOfShares', type: 'string'},
			{name: 'PurchasePrice', type: 'string'}, 
			{name: 'prevVolume', type: 'string'},
			{name: 'prevClose', type: 'string'},		
			{name: 'PHChange', type: 'float'},	
                ],
                url: this.portfolioviewurl
        };

	dataAdapterGrid: any = new jqx.dataAdapter(this.sourcegrid, {
                beforeSend: function (jqXHR, settings) {
                        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                        //console.log(this.currentUser);
                        var token = "Bearer " + this.currentUser.token;
                        jqXHR.setRequestHeader('Authorization', token);
                },
		loadComplete: function(data) {
			//console.log(data);
                        //let rows = data.length;
                        //let rowdata = data;
                        //let PHChange = 0;
                        //let PHChangeT = 0;
                        //for (let i = 0; i < rows; i++) {
                          //      PHChange = (parseFloat(rowdata[i].lastClose)*parseFloat(rowdata[i].NumberOfShares) - parseFloat(rowdata[i].PurchasePrice));
			//	data[i].PHChange = PHChange;
                                //this.myGrid.setcellvalue(i,'PHChange',this.dataAdapterGrid.formatNumber(PHChange, "f1"));
                                                       // PHChangeT = PHChangeT + PHChange;
                                                        //this.myGrid.addrow(rows,{PHChange: PHChange})
                       // }
						//this.dataAdapterGrid.dataBind();
                                                //console.log(this);
                                                //this.myGrid.setOptions({showstatusbar: true});
                                                //this.myGrid.refresh();

                },
		beforeLoadComplete: function (records) {
			//console.log(records);
			let rows = records.length;
			let rowdata = records;
			let PHChange = 0;
                        let PHChangeP = 0;
			let PHValue = 0;
                        for (let i = 0; i < rows; i++) {
                                PHChange = (parseFloat(rowdata[i].lastClose)*parseFloat(rowdata[i].NumberOfShares) - parseFloat(rowdata[i].PurchasePrice));
				PHValue = parseFloat(rowdata[i].lastClose)*parseFloat(rowdata[i].NumberOfShares);
				PHChangeP = 100*(PHChange)/parseFloat(rowdata[i].PurchasePrice);
                                records[i].PHChange = PHChange;
				records[i].PHChangeP = PHChangeP;
				records[i].PHValue = PHValue;
			}
			return records;


		}

        });




	columns: any[] = 
	[
		{text: 'Symbol', datafield: 'Symbol'},
		{text: 'NumberOfShares', datafield: 'NumberOfShares', hidden: true},
		{text: 'PurchasePrice', datafield: 'PurchasePrice', hidden: true,aggregates: ['sum']},
		{text: 'Price', datafield: 'lastClose'},
		{text: 'Change', datafield: 'Change', 
			cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Change = parseFloat(rowdata.lastClose) - parseFloat(rowdata.prevClose);
			  if(Change >= 0)
                          	return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "f2") + "</div>";
			  else
				return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "f2") + "</div>";
			},
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Share Price Change" });
                        },

                },
		{text: 'Change(%)', datafield: 'CP',hidden: true, 
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Change = 100*(parseFloat(rowdata.lastClose) - parseFloat(rowdata.prevClose))/parseFloat(rowdata.prevClose);
                          if(Change >= 0)
                                return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "p1") + "</div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "p1") + "</div>";
                        },
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Share Price Change(%)" });
                        },

                },
		{text: 'Volume(K)', datafield: 'Volume', hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Volume = (parseFloat(rowdata.lastVolume))/1000
                          return "<div style='margin: 4px;' class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Volume, "f1") + "</div>";
                }},
		{text: 'Vol.Change(%)', datafield: 'VChange', hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
			
                          let VChange = 100*(parseFloat(rowdata.lastVolume)-parseFloat(rowdata.prevVolume))/parseFloat(rowdata.prevVolume)
			  if(parseFloat(rowdata.prevVolume) == 0)
				VChange=0;
			  if(VChange >= 0)
                                return "<div style='margin: 4px;background-color: #008000;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(VChange, "p2")+" </div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(VChange, "p2")+" </div>";
                }},


		{text: 'PHChange', datafield: 'PHChange', cellsformat: 'f1', aggregates: ['sum'],
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          //let PHChange = (parseFloat(rowdata.lastClose)*parseFloat(rowdata.NumberOfShares) - parseFloat(rowdata.PurchasePrice)) ;
			  //console.log(rowdata);
			  if(rowdata.PHChange >= 0)
                          	return "<div style='margin: 4px;background-color: #008000;' class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(rowdata.PHChange, "f1") + "</div>";
			  else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(rowdata.PHChange, "f1") + "</div>";
                	},
			aggregatesrenderer: (aggregates: any, column: any, element: any, summaryData: any): string => {
                                let renderstring = '<div class="jqx-widget-content jqx-widget-content-dark' + '" style="float: left; width: 100%; height: 100%;">';
                                for (let obj in aggregates) {
					//console.log(obj);
                                        let name = obj;
                                        let color = '#00b000';
                                        let value = aggregates[obj];
					//console.log(value);
                                        if (obj == 'sum' && summaryData['sum'] < 0) {
                                                color = 'red';
                                        }
                                        renderstring += '<div style="color: ' + color + '; position: relative; margin: 6px; text-align: right; overflow: hidden;">' + value + '</div>';
                                }
                                renderstring += '</div>';
				//console.log(renderstring);
                                return renderstring;
                        },

			rendered: function (element) {
                          	element.jqxTooltip({ position: 'mouse', content: "Portfolio Holding Change" });
                      	},

		},


		{text: 'PHValue', datafield: 'PHValue', hidden: true,  aggregates: ['sum'],
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          //let PHValue = parseFloat(rowdata.lastClose)*parseFloat(rowdata.NumberOfShares);
                          return "<div style='margin: 4px;' class='jqx-right-align' >" + this.dataAdapterGrid.formatNumber(rowdata.PHValue, "f1") + "</div>";
                	},
			aggregatesrenderer: (aggregates: any, column: any, element: any, summaryData: any): string => {
                                let renderstring = '<div class="jqx-widget-content jqx-widget-content-dark' + '" style="float: left; width: 100%; height: 100%;">';
                                for (let obj in aggregates) {
                                        let name = obj;
                                        let color = '#00b000';
                                        let value = aggregates[obj];
                                        if (obj == 'sum' && summaryData['sum'] < 0) {
                                                color = 'red';
                                        }

                                        renderstring += '<div style="color: ' + color + '; position: relative; margin: 6px; text-align: right; overflow: hidden;">' + this.dataAdapterGrid.formatNumber(value, "f1") + '</div>';
                                }
                                renderstring += '</div>';
                                return renderstring;
                        },

			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Portfolio Holding Value" });
                        },

		},
		{text: 'PHChange(%)', datafield: 'PHChangeP',  cellsformat: 'f1',hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          //let PHChangeP = 100*(parseFloat(rowdata.lastClose)*parseFloat(rowdata.NumberOfShares) -  parseFloat(rowdata.PurchasePrice))/parseFloat(rowdata.PurchasePrice);
			  if(rowdata.PHChangeP >= 0)
                                return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(rowdata.PHChangeP, "p1") + "</div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(rowdata.PHChangeP, "p1") + "</div>";
                	},
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Portfolio Holding Change (%)" });
                        },
			aggregatesrenderer: (aggregates: any, column: any, element: any, summaryData: any): string => {
				let renderstring = '<div class="jqx-widget-content jqx-widget-content-dark' + '" style="float: left; width: 100%; height: 100%;">';
				for (let obj in aggregates) {
					let name = obj;
					let color = '#00b000';
					let value = aggregates[obj];
					if (obj == 'PC(%)' && summaryData['PC(%)'] < 0) {
                        			color = 'red';
                    			}
				
					renderstring += '<div style="color: ' + color + '; position: relative; margin: 6px; text-align: right; overflow: hidden;">' + name + ': ' + value + '</div>';
				}
				renderstring += '</div>';
                		return renderstring;
			},
			aggregates: [{
                                '<b>PC(%)</b>': (aggregatedValue: number, currentValue: number, column: any, rowdata: any): number => {
					let PPstring = this.myGrid.getcolumnaggregateddata('PurchasePrice',['sum']);
					let PHCstring = this.myGrid.getcolumnaggregateddata('PHChange',['sum']);
					let PP = parseFloat(PPstring['sum']);
					let PHC = parseFloat(PHCstring['sum']);
					//console.log(PHC/PP);
					

					return PHC/PP;
                                },
				
				
                        }]


		},



		//{text: 'PreviousPrice', datafield: 'prevClose'}
	];


	columnsindices:any[] = 
	[
		 {text: 'Index', datafield: 'Symbol'},
                 {text: 'Value', datafield: 'valuess',
			cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
			let valuess = rowdata.lastClose;
			return "<div style='margin: 4px;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(valuess, "f2")+" </div>";
		 }},
		 {text: 'Change', datafield: 'Change',
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Change = parseFloat(rowdata.lastClose) - parseFloat(rowdata.prevClose);
                          if(Change >= 0)
                                return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "f2") + "</div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "f2") + "</div>";
                	},
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Index Change" });
                        },

		},
		{text: 'Change(%)', datafield: 'CP',hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Change = 100*(parseFloat(rowdata.lastClose) - parseFloat(rowdata.prevClose))/parseFloat(rowdata.prevClose);
                          if(Change >= 0)
                                return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "p1") + "</div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "p1") + "</div>";
                        },
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Index Change (%)" });
                        },
                },

		{text: 'Volume(K)', datafield: 'Volume',hidden: true,
			cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                        let Volume = (parseFloat(rowdata.lastVolume))/1000;
                        return "<div style='margin: 4px;'  class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(Volume, "n2")+" </div>";
		}},
		{text: 'Vol.Change(%)', datafield: 'VChange',hidden: true,
			cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
			let VChange = 100*(parseFloat(rowdata.lastVolume) - parseFloat(rowdata.prevVolume))/(parseFloat(rowdata.prevVolume));
			if(parseFloat(rowdata.prevVolume) == 0)
                                VChange=0;
			if(VChange >= 0)
                                return "<div style='margin: 4px;background-color: #008000;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(VChange, "p2")+" </div>";
                        else
                                return "<div style='margin: 4px;background-color: #aa0000;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(VChange, "p2")+" </div>";
		}},

	]


	columnssectors:any[] =
        [
                 {text: 'Sector', datafield: 'Symbol'},
                 {text: 'Value', datafield: 'valuess',
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                        let valuess = rowdata.lastClose;
                        return "<div style='margin: 4px;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(valuess, "f2")+" </div>";
                 }},
                 {text: 'Change', datafield: 'Change',
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Change = parseFloat(rowdata.lastClose) - parseFloat(rowdata.prevClose);
                          if(Change >= 0)
                                return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "f2") + "</div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "f2") + "</div>";
                	},
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Index Change" });
                        },
		},
		{text: 'Change(%)', datafield: 'CP',hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                          let Change = 100*(parseFloat(rowdata.lastClose) - parseFloat(rowdata.prevClose))/parseFloat(rowdata.prevClose);
                          if(Change >= 0)
                                return "<div style='margin: 4px;background-color: #008000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "p1") + "</div>";
                          else
                                return "<div style='margin: 4px;background-color: #aa0000;'  class='jqx-right-align'>" + this.dataAdapterGrid.formatNumber(Change, "p1") + "</div>";
                        },
			rendered: function (element) {
                                element.jqxTooltip({ position: 'mouse', content: "Index Change(%)" });
                        },
                },
                {text: 'Volume(K)', datafield: 'Volume',hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                        let Volume = (parseFloat(rowdata.lastVolume))/1000;
                        return "<div  style='margin: 4px;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(Volume, "n2")+" </div>";
                }},
                {text: 'Vol.Change(%)', datafield: 'VChange',hidden: true,
                        cellsrenderer: (index:number, datafield: string, value:any, defaultvalue:any, column:any, rowdata: any): string=> {
                        let VChange = 100*(parseFloat(rowdata.lastVolume) - parseFloat(rowdata.prevVolume))/ parseFloat(rowdata.prevVolume);
			if(parseFloat(rowdata.prevVolume) == 0)
                                VChange=0;
			if(VChange >= 0)
                        	return "<div style='margin: 4px;background-color: #008000;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(VChange, "p2")+" </div>";
			else
				return "<div style='margin: 4px;background-color: #aa0000;' class='jqx-right-align'>"+this.dataAdapterGrid.formatNumber(VChange, "p2")+" </div>";
                }},

        ]



	ngAfterViewInit() {
		let layoutsLength = 3;
		let firstElement = this.firstElement.nativeElement;
        	let secondElement = this.secondElement.nativeElement;
        	let thirdElement = this.thirdElement.nativeElement;
        	this.DockPanel.elementRef.nativeElement.style.color = 'white';
		for (let i = 0; i < layoutsLength; i++) {
                    this.DockPanel.elementRef.nativeElement.firstChild.firstChild.children[i].style.height = '70px';
                }
		firstElement.style.height = '5%';
		secondElement.style.height = '60%';
		thirdElement.style.height = '45%';
		firstElement.setAttribute('dock', 'top');
                secondElement.setAttribute('dock', 'top');
                thirdElement.setAttribute('dock', 'top');
		this.DockPanel.refresh();
		//console.log(this.myComboBox);
		this.myComboBox.selectIndex(0);
		this.portfolioviewurl = this.portfolioviewbaseurl + this.myComboBox.getItem(0);
		this.sourcegrid.url=this.portfolioviewurl;
		this.myGrid.setOptions({showstatusbar: true});
		this.myGrid.refresh();
		
			
	
	}

	onSelect(event: any): void {
        	let args = event.args;
        	if (args != undefined) {
            		let item = event.args.item;
            		if (item != null) {
                		//this.myPanel.prepend(`<div style="margin-top: 5px;">Selected: ${item.label}</div>`);
				this.portfolioviewurl = this.portfolioviewbaseurl + item.label
				//console.log(this.portfolioviewurl);
				this.sourcegrid.url=this.portfolioviewurl;
				this.dataAdapterGrid.dataBind();
				switch(item.label) {
					case "Indices":
						this.myGrid.setOptions({columns: this.columnsindices});
						this.myGrid.setOptions({showstatusbar: false});
						this.myGrid.refresh();
						break;
					case "Sectors":
                                                this.myGrid.setOptions({columns: this.columnssectors});
						this.myGrid.setOptions({showstatusbar: false});
						this.myGrid.refresh();
                                                break;
					case "Sub-Sectors":
						this.myGrid.setOptions({showstatusbar: false});
                                                this.myGrid.setOptions({columns: this.columnssectors});
                                                break;
					default:
                                                this.myGrid.setOptions({columns: this.columns});
						this.myGrid.setOptions({showstatusbar: true});
						
						this.myGrid.refresh();
                                                break;
				}
				//this.dataAdapterGrid.dataBind();
				
            		}
        	}
    	}


     myGridOnCellSelect(event: any): void {
        let columnheader = this.myGrid.getcolumn(event.args.datafield).text;
	//console.log(columnheader);
	switch(columnheader){
		case "Change":
			this.myGrid.hidecolumn(columnheader);
			this.myGrid.showcolumn("CP");
			break;
		case "Change(%)":
			this.myGrid.hidecolumn("CP");
			this.myGrid.showcolumn("Volume");
                        break;
		case "Volume(K)":
                        this.myGrid.hidecolumn("Volume");
                        this.myGrid.showcolumn("VChange");
                        break;
		 case "Vol.Change(%)":
                        this.myGrid.hidecolumn("VChange");
                        this.myGrid.showcolumn("Change");
                        break;
		case "PHChange":
			this.myGrid.hidecolumn("PHChange");
                        this.myGrid.showcolumn("PHChangeP");
                        break;
		case "PHChange(%)":
                        this.myGrid.hidecolumn("PHChangeP");
                        this.myGrid.showcolumn("PHValue");
                        break;
		case "PHValue":
                        this.myGrid.hidecolumn("PHValue");
                        this.myGrid.showcolumn("PHChange");
                        break;

	}	
    }
}



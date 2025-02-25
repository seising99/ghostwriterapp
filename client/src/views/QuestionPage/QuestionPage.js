import React, {Component} from 'react';
import  './QuestionPage.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import Toolbar from '../../components/Toolbar/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionPage extends Component {
	
	constructor(props) {
	 
		super(props);
		this.state = {
			text: '',
			block: [],
			selectedSections: this.props.resData.map((id) => {
				return id.sectionid;
			})
		};

	}
	
	qPage = (restext) =>
	{
		this.setState({text: restext});
		this.props.response(restext);
	}

	updateSelectedSections = (arg, sectionId) =>{
		console.log(arg.length)
		console.log(this.props.resData)
		if(arg.length > this.props.resData.length){
			let temp = this.props.questions.filter(item => {
				return item.sectionid === sectionId
			})
			console.log(temp)
			let temp2 = this.props.resData
			temp2.push(temp[0])
			console.log(temp2)
			this.props.secOrder(temp2)
		} 
		else{
			let temp = this.props.resData.filter(item => {
				return arg.includes(item.sectionid)
			})
			console.log(temp)
			this.props.secOrder(temp)
		}
	}
	secOrder = (order) => 
	{	
		console.log(order)
		this.props.secOrder(order);
		this.render()
	}

	
    render() {
		const selectedSections = this.props.resData.map((id) => {
			return id.sectionid;
		})
		console.log(selectedSections)
		return(
			
			<div className="App">
			
				<div style={{paddingTop: '50px'}} />
				
				<div className="toolbar" > 
					<Toolbar 
					data={this.props.questions}
					selectedSections = {selectedSections}
					updateSelectedSections = {this.updateSelectedSections.bind(this)}
					/>
				</div>
				
				<div className="Dashboard" style={{marginLeft: '20%'}}>
					<Dashboard oldData={this.props.oldData} data={this.props.questions} resData={this.props.resData} callbackQPage={this.qPage} callbackOrder={this.secOrder.bind(this)}/>
				</div>
				
				<div style={{width: '20%'}}>  </div>
				<br></br>
				<div className = "exportButtons-wrapper">
					<button className = "downloadFree">
						Download Free
					</button>
					<br></br>
					<br></br>
					<button className = "downloadPaid">
						Download Paid
					</button>
				</div>
			</div>

		);
		
    }
  
}


export default QuestionPage;

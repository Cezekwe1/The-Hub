import React, { Component } from 'react'
import * as search_util  from '../../utilities/search_util'
import { thisExpression } from '@babel/types';
export class search extends Component {
    constructor(props){
        super(props)
        var dict = search_util.processMembers(this.props.members)
        this.state = {members:this.props.members, searchOn: false, filteredMembers:[], members_dict: dict, addedOwners:[]}
    }

    searching(){
        var list, addList;
        if(this.state.searchOn){
            list =  <ul>{this.state.members.map((member)=>{return <li>{member.name}</li>})}</ul>
        }else{
            if (this.state.filteredMembers.length > 0){
                list = <ul className="list-group">{this.state.filteredMembers.map((member)=>{return <li className="list-group-item"  onClick={this.assignOwner(member)} key={member.id}>{member.username}</li>})}</ul>
            }else{
                list = ""
            }
        }

        if(this.state.addedOwners.length > 0){
            addList = <ul>{this.state.addedOwners.map((member)=> <li onClick={this.removeOwner(member)} key={member.id}>{member.name}</li>)}</ul>
        }else{
            addList = ""
        }
        return {list,addList}
    }

    update(){
        return e =>{
            let text = e.target.value
            if (text == ""){
                this.updateFilter([])
                return 
            }
            let result = []
            let current = this.state.members_dict.members
            
            for (let i in text){
                let c = text[i].toLowerCase()
                if (!current[c]){
                    this.updateFilter([])
                    return
                }
                current = current[c]
            }
            this.updateFilter(current.rest)
        }
    }

    assignOwner(owner){
        return e =>{

            this.setState({
                addedOwners: this.state.addedOwners.concat([owner])
            })
            this.props.addOwner(owner)
            this.updateFilter([])
        }
    }

    removeOwner(owner){
        return e=>{
            let idx = this.state.addedOwners.indexOf(owner)
            this.setState({
                addedOwners: this.state.addedOwners.slice(0,idx).concat(this.state.addedOwners.slice(idx + 1))
            })
            this.props.removeOwner(owner.id)
        }
    }
    

    updateFilter(arr){
        this.setState({
            filteredMembers: arr
        })
    }
    render() {
        var {list,addList} = this.searching()
        return (
            <div className="mb-2">
                <div><input  onChange={this.update()}type="text" placeholder="Search..."/></div>
                {list}
            </div>
        )
    }
}

export default search

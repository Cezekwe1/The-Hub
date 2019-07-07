import Trie from "./Trie"
import axios from 'axios'
import {API_URL} from "../config"
export const processMembers = (members) =>{
    var trie = new Trie();
    
    for (let member of members){
        trie.add(member.username, member.id)
    }
    return trie
}

export const search = (str) =>{
    return axios.get(`${API_URL}/users/search/${str}`,{headers: {"Authorization": "Token " + localStorage.getItem("token")}})
}




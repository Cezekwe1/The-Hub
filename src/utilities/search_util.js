import Trie from "./Trie"

export const processMembers = (members) =>{
    var trie = new Trie();
    
    for (let member of members){
        trie.add(member.username, member.id)
    }
    return trie
}


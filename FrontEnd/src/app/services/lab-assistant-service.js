import {get, post} from "../api-manager.js";

class LabAssistantService{
    static  async getAllLabAssistants(){
        return await get({
            path: "/labAssistant"
        });
    }

    static  async newLabAssistant({labAssistant}){
        return await post({
            path: "/labAssistant/add",
            body: labAssistant
        })
    }

    static  async updateLabAssistant(id, labAssistant){
        return await post({
            path: "/labAssistant/update/" + id,
            body: labAssistant
        })
    }

}

export default LabAssistantService;
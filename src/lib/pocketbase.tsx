import PocketBase from 'pocketbase';

type AuthForm = {
    email: string,
    password: string,
    passwordConfirm: string,
}

const url = `${import.meta.env.VITE_POCKETBASE}`;

const pb = new PocketBase(url);

export const isUserValid = pb.authStore.isValid; 
pb.autoCancellation(false);

export async function login(email: string, password: string){
     await pb.collection("users").authWithPassword(email, password);
    const recordId = pb.authStore.record?.id;    
    return recordId;
}

export function signout(){
    pb.authStore.clear();
    

    window.location.reload();
}

export async function signup(data: AuthForm){
    await pb.collection("users").create(data);
    await pb.collection("users").authWithPassword(data.email, data.password);
    const recordId = pb.authStore.record?.id;
    return recordId;



}
export async function getList(){
    return await pb.collection("collection").getFullList();

}
export async function createRecord(name:string,job:string) {
    const data = {name:name,job:job}
    await pb.collection("collection").create(data);
}

export async function deleteRecord(id:string) {
    let confirm = window.confirm("Are you sure you want to delete this record?");
    if(!confirm) return;
    await pb.collection("collection").delete(id);
}

export async function updateRecord(id:string,name:string,job:string) {
    const data = {name:name,job:job}
    await pb.collection("collection").update(id,data);

}

export async function getRecordById(dataId:string) {
    try{
        return await pb.collection("collection").getOne(dataId);
        
    }catch(err){
        console.log(err);
        
    }
    
}

export default pb;
import { defineStore } from 'pinia'
import { NewUser } from '../user';

export const useUsers = defineStore('users',{
    actions : {
        createUser(newUser : NewUser){
            const body = JSON.stringify(newUser)
            return window.fetch('http://localhost:8000/users' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error creating post:', error);
                throw error; 
            });
        }
    }
})
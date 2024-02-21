import { defineStore } from 'pinia'
import { NewUser } from '../user';

interface UserState {
    currentId?: string
}
export const useUsers = defineStore('users',{
    state : (): UserState => ({
        currentId : undefined
    }),
    actions : {
        async  authenticate() {
            try {
                const res = await window.fetch('/api/current-user',{
                headers :{
                "Content-Type" : "application/json"
                }
            })
            const result = await res.json()
            this.currentId = result.id
            } catch (error) {
                this.currentId = undefined
            }
        },
        async createUser(newUser: NewUser) {
            const body = JSON.stringify(newUser);
            try {
                const response = await window.fetch('api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return this.authenticate(); // Authenticate user
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        },
        async logoutUser() {
            try {
                await window.fetch('api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                return this.authenticate(); // Authenticate user
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        }    
    }
})
import { defineStore } from "pinia";

const store = defineStore('piniaStore', {
    state() {
        return {
            theme: 'light',
            isAddingFood: false
        }
    },
    actions: {
        changeTheme() {
            this.theme === 'light'
                ? this.theme = 'dark'
                : this.theme = 'light'
        },
        openAddFood() {
            this.isAddingFood = true;
        },
        closeAddFood() {
            this.isAddingFood = false;
        }
    },
    persist: true
});

export default store;
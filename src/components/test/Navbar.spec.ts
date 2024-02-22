import { mount } from "@vue/test-utils";
import { beforeEach, describe,expect,it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import Navbar from "./Navbar.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../../router";
import { useUsers } from "../../stores/users";

describe('Navbar', () => {
    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'modal';
        document.body.appendChild(el);

        const userStore = useUsers();
        userStore.currentUserId = '1611'; // Set currentUserId to simulate authentication
        const Pinia = createPinia();
        setActivePinia(Pinia)
        const router = createRouter({
            history: createMemoryHistory(),
            routes: routes
        });
        const wrapper = mount(Navbar, {
            global: {
                plugins: [Pinia, router]
            }
        });
    });

    it('renders sign in and sign up when not authenticated', () => {
        expect(wrapper.find('#signIn').exists()).toBe(true);
        expect(wrapper.find('[data-testid="signIn"]').exists()).toBe(true);
    });

    it('renders logout and newpost when authenticated', async () => {
        await wrapper.vm.$nextTick();

        expect(wrapper.find('#newPost').exists()).toBe(true);
        expect(wrapper.find('#newPost').text()).toBe('New Post');
        expect(wrapper.find('#logOut').exists()).toBe(true);
        expect(wrapper.find('#logOut').text()).toBe('Log Out');
    });
});
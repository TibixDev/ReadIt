import { createStore } from 'vuex'

export default createStore({
    state: {
        ReadLink: "",
        IsRaw: false,
        ContentSelector: "",
    },
    mutations: {
        UpdateReadLink (state, link) {
            state.ReadLink = link;
        },
        ChangeRaw (state) {
            state.IsRaw = !state.IsRaw;
        },
        UpdateContentSelector (state, selector) {
            state.ContentSelector = selector;
        }
    },
    actions: {
    },
    modules: {
    }
})

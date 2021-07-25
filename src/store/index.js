import { createStore } from 'vuex'

export default createStore({
    state: {
        ReadLink: "",
        IsRaw: false,
        QuerySelector: "",
    },
    mutations: {
        UpdateReadLink (state, link) {
            state.ReadLink = link;
        },
        ChangeRaw (state) {
            state.IsRaw = !state.IsRaw;
        },
        UpdateQuerySelector (state, selector) {
            state.QuerySelector = selector;
        }
    },
    actions: {
    },
    modules: {
    }
})

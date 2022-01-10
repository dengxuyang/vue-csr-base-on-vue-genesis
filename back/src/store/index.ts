import Vue from 'vue';
import Vuex from 'vuex';

export interface State {
        code: string;
}

Vue.use(Vuex);

/**
 * 提供一个工厂函数创建 store
 */
export const store =  new Vuex.Store<State>({
    state: {
    code:'11'
    },
    mutations: {
        setcode(state, code: string) {
            state.code = code;
        },
      
    }
});
  


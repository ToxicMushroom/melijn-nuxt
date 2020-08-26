import Vue from 'vue'

Vue.directive('validate', {
  bind (el, _, vnode) {
    // We don't care about binding here.
    el.addEventListener('input', (e) => {
      const vm = vnode.context // this is the Vue instance.

      // We use Object.assign to make sure everything is reactive.
      // And because we used an object for our error storage, since a key-value data structure
      // is better than a lookup array in our case.
      vm.errors = Object.assign({}, vm.errors, {
        [el.name]: e.target.validationMessage
      })
    })
  }
})

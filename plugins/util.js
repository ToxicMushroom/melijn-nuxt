import header from './header/header'

export default function (ctx, inject) {
  const util = {
    ...header(ctx)
  }

  inject('util', util)
}
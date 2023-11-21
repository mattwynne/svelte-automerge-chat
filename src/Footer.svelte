<footer>
  See
  <a href="https://github.com/mattwynne/svelte-automerge-chat">Github</a>
  <br />
  v. {process.env.APP_VERSION} git {process.env.COMMIT_HASH}
</footer>

<style>
  footer {
    color: grey;
    margin: 4rem 0 1rem 0;
    font-size: 10px;
    text-align: center;
    line-height: 1.6;
  }

  span {
    color: red;
  }
</style>

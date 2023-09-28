<!-- Header.svelte -->
<header>
    
    <nav>
      <ul>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
    <a href="/">Tim Sonner</a>
  </header>

  <style>
    header {
      padding: 1rem;
      background: lightgray;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    
    ul {
      margin: 0;
      list-style-type: none;
      display: flex;
      gap: 1rem;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
    </style>
export function redirectPaths(auth,user,pathname,router) {
    const pathnames = ["/login", "/register"];

    if (auth == true && user) {
      
      if (pathnames.includes(pathname)) {
         router.push("/");
      }
    }
  }
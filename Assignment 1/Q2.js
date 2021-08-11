getData = (url) => {
  return new Promise((resolve, reject) => {
      $.getJSON({
          url: url,
          type: 'GET',
          data: {},
          success: (data) => {
              resolve(data)
          },
          error: (error) => {
              reject(error)
          },
      })
  })
}

myFunction = async () => {
  let output = []
  let query = $("#input").val()
  let licenseName = null
  if (query.length !== 0) {
      const url = "https://api.github.com/search/repositories?q="
      await getData(url + query).then(async (data) => {
        
        for(let item in data.items){
          if (data.items[item].license == null)
            licenseName = null
          else
            licenseName = data.items[item].license.name

          let item_output = {
            "name": query,
                  "full_name": data.items[item].full_name,
                  "private": data.items[item].private,
            "owner":{
                "login":data.items[item].owner.login,
              "name":data.items[item].owner.url,
                      "followersCount": data.items[item].owner.url.followersCount,
                      "followingCount": data.items[item].owner.url.followingCount,
                  },
                 "licenseName":licenseName,
                 "score": data.items[item].score,
                 "numberOfBranch":data.items[item].branches_url.split("{")[0].length
          }
          output.push(item_output)
        }
      }).catch((error) => {
          console.log(error)
      })
  }
  console.log(output)
}
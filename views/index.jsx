const React = require('react')
const Default = require('./layouts/Default')
// const index = require('/views/index')

function Index ({breads, bakers, title})  {
    return (
        <Default title={title}>
          {/* <link rel="shortcut icon" type="image/jpg" href="Favicon_Image_Location"/> */}
  <h2>Check out this BREAD!!!</h2>
        <h3>Bakers</h3>
        <ul>
            {
                bakers.map((baker)=> {
                    return (
                        <li key={baker._id}>
                            <a href={`/bakers/${baker._id}`}>{baker.name}</a>
                        </li>
                    )
                })
            }
        </ul>
        <h3>Breads</h3>
  <div className="newButton">
  <a href="/breads/new"><button>Add a new bread</button></a>
</div>
  <ul>
  {
  breads.map((bread, index)=> {
    return (
      <li key={bread._id}>
        <a href={`/breads/${bread._id}`}>
          {bread.name}
        </a>
      </li>
    )
  })
}




  </ul>
</Default>

      
    )
}


module.exports = Index

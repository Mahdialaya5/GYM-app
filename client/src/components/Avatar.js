import React from 'react'
import Img from "./jeune.jpg"
function Avatar() {
  return (<>
<img src={Img}  style={{width:"50px",borderRadius:"20%"}} alt='user' />
</>
  )
}

export default Avatar
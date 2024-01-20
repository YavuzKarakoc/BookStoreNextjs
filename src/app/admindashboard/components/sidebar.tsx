import React from 'react'

const Sidebar = () => {
  return (
    <div className='bg-danger d-flex flex-column  justify-content-center'>
        <div>LOGO</div>
        <div>
        <ul className='list-unstyled'>
        <li>
                <a href="/admindashboard">
                    AdminDashboard
                </a>
            </li>
            <li>
                <a href="/admindashboard/booklist">
                    BookList
                </a>
            </li>
            <li>
            <a href="/admindashboard/authorlist">
                    AuthorList
                </a>
            </li>
        </ul>
        </div>
        
    </div>
  )
}

export default Sidebar
const React = require('react')
const Default = require('./layouts/Default')

function NotFound ()  {
    return (
        <Default>
            <h2>404 Not Found</h2>
        </Default>
    )
}

module.exports = NotFound
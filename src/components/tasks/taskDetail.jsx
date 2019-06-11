import React from 'react'

export default function taskDetail(task) {
    return (
        <div className="card bg-light h-25 mb-5 w-25">
            <h2 className="">{task.props.title}</h2>
            <p>{task.props.description}</p>
        </div>
    )
}

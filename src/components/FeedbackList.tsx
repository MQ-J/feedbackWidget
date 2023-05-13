import { useState } from "react"
import { Loading } from "./Loading"

export function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([])

    if(feedbacks == []) {
        fetch(
            `https://polar-shelf-77439.herokuapp.com/api/spa/getFeedbacks`,
            {
                method: "get",
            }
        ).then((res) => res.json()).then((res) => {
    
            if (res['connection'] == 'OK') {

                setFeedbacks(res['feedbacks'])
            } else {
                alert("erro ao recuperar feedbacks")
            }
        })
    }

    return (
        <div className="flex justify-center mt-6">
            {feedbacks == [] ? (
                
                feedbacks.map((c) =>
                    <div className="bg-zinc-800 rounded-md p-2">
                        <p> {c['comment']} </p>
                    </div>
                )
            ) : (
                <div className="bg-zinc-800 rounded-md p-2">
                    <Loading />
                </div>
            )}
        </div>
    )
}
import { ArrowArcLeft, ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    OnFeedbackSend: () => void
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, OnFeedbackSend }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState("")

    const FeedbackTypeInfo = feedbackTypes[feedbackType]

    function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()

        const feedback = new FormData();
        feedback.append("screenshot", screenshot!);
        feedback.append("comment", comment);

        fetch(
            `https://polar-shelf-77439.herokuapp.com/api/spa/sendFeedback`,
            {
                body: feedback,
                method: "post",
            }
        ).then((res) => res.json()).then((res) => {

            if (res['connection'] == 'OK') {
                OnFeedbackSend()
            } else {
                alert("erro ao enviar feedback, desculpa :(")
            }
        })
    }

    return (
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={FeedbackTypeInfo.image.source} alt={FeedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {FeedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        disabled={comment.length === 0}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>
    )
}
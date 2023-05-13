import { useState } from 'react'
import { CloseButton } from '../CloseButton'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'

import problemaSvg from "../../assets/bug.svg"
import ideiaSvg from "../../assets/idea.svg"
import outroSvg from "../../assets/thought.svg"

export const feedbackTypes = {
  BUG: {
    title: 'problema',
    image: {
      source: problemaSvg,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideiaSvg,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: outroSvg,
      alt: 'Imagem de um balão de pensamento',
    },
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSend(false)
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSend ? (
        <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              OnFeedbackSend={() => setFeedbackSend(true)}
            />
          )}
        </>
      )}


      <footer className="text-xl text-neutral-400">
        Feito com ❤️ pelo <a className="underline underline-offset-2" href="https://github.com/MQ-J">Querino</a>
      </footer>
    </div>
  )
}

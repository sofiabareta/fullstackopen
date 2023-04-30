import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const Title = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const max = anecdotes.length - 1
    setSelected(Math.floor(Math.random() * max))
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] = copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text={"next anecdote"} onClick={() => handleClick()}/>
      <Button text={"vote"} onClick={() => handleVote()}/>
      <Title text={"Anecdote with most votes"} />
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>has {Math.max(...points)} points</p>
    </div>
  )
}

export default App
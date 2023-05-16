import Image from "./Image"

const FullInfo = ({
    name,
    capital,
    area,
    languages,
    flag
}) => {
    return (
        <>
          <h2>{name}</h2>
          <p>{`capital ${capital}`}</p>
          <p>{`area ${area}`}</p>

          <h3>languages:</h3>
          <ul>
            {
              Object.keys(languages).map(val => {
                return (
                    <li key={val}>{languages[val]}</li>
                )
              })
            }
          </ul>
          <Image src={flag} alt={`${name} flag`}/>
        </>
    )
}

export default FullInfo
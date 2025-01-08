// import React from "react"

// export interface OverviewProps{
//     backToHome: () => void
//     // storageToShow : Map<number, Person>,
// }

// export class OverviewPage extends React.Component<OverviewProps,{}>
// {
//     constructor(props: OverviewProps){
//         super(props)

//     }


//     render (): JSX.Element{
//         return(
//             <div>
//                 <div>
//                     Welcome to our overview page
//                 </div>
//                 <br />
//                 <button
//                     onClick = {e=>this.props.backToHome()}
//                 >
//                     Back
//                 </button>
//                 <table>
//                     <tr>
//                         <th>Firstname</th>
//                         <th>Lastname</th>
//                         <th>Age</th>
//                     </tr>
//                     {/* {Array.from(this.props.storageToShow).map((person: [number,Person]) => {
//                         return(
//                             <tr>
//                                 <td>{person[1].name}</td>
//                                 <td>{person[1].lastname}</td>
//                                 <td>{person[1].age}</td>
//                             </tr>
//                         ) */}
//                     {/* })} */}
//                 </table>
//             </div>
//         )
//     }
// }

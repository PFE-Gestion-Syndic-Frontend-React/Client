import React from 'react'

function Statistique() {
    return (
        <div>
            <div className="container ">
                <div style={{top : "120px", paddingTop : "50px"}}>
                    <h1 style={{marginLeft : "200px"}}>Les Statistiques </h1>
                </div><br/><br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card w-75 text-black bg-primary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                <div className=" row">
                                    <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-people-fill m-5" style={{width : "700px"}} ></i></h1> </div>
                                    <h2 className="" style={{paddingLeft : "45px"}} > 106 Utilisateurs ( 7 Administrateurs et 99 Copropriétaires) </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card w-75 text-black bg-secondary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                <div className="row">
                                    <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-wallet2 m-5" style={{width : "700px"}}></i></h1></div>
                                    <h2 style={{paddingLeft : "45px"}}> Nombre de Dépenses : 14 </h2>
                                    <h3 style={{paddingLeft : "45px"}}> Montant TTC <strong style={{color : "red"}}>16896</strong>  Dhs</h3><br /><br/><br/>
                                    <div className="text-center">
                                        <p className=" text-silver center" style={{fontSize : "14px"}}><strong>Du 31/05/2021 Au 25/06/2021</strong>  </p>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistique

import React from 'react'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'


function Politiques() {


    return (
        <>
            <div className='col-12'>
                <div className="d-flex">
                    <div className="col-2">
                        <Leftbar />
                    </div>
                    <div className="col-10 ressources">
                        <div className="col-12">
                            <Navbar />
                        </div>
                        <div className="col-12" style={{ marginTop: '80px' }}>
                            <div className="card ressources">
                                <div className="card-body">
                                    <h3>Politiques de confidentialité</h3>
                                </div>
                            </div>
                            <div className="card mt-3 p-4">
                                <h5 className='mb-3' style={{ fontWeight: 'bold' }}>Présentation</h5>
                                <div className='' style={{ textAlign: 'justify' }}>
                                    <p>
                                        Onyo-bt a élaboré la présente Politique de confidentialité pour expliquer comment Onyo-bt, en tant que Responsable du contrôle des données,
                                        peut collecter, conserver, traiter, partager et transférer vos Données personnelles lorsque vous visitez nos Sites ou utilisez nos Services.
                                        <br />

                                        La présente Politique de confidentialité s'applique à vos Données personnelles lorsque vous visitez les Sites ou utilisez les Services. Elle ne s'applique pas aux sites ou services en ligne dont nous ne sommes pas propriétaires ou que nous ne contrôlons pas, notamment les sites ou services d'autres Utilisateurs Onyo-bt.
                                    </p>
                                    <p> La présente Politique de confidentialité a pour but de vous fournir des informations sur nos pratiques en matière de respect de la vie privée et de vous présenter les options qui s'offrent à vous lorsque vous utilisez nos Sites et Services. Notez que nos offres de Services peuvent varier d'une région à l'autre. La présente Politique de
                                        confidentialité peut être complétée par des avis supplémentaires selon les Sites et Services concernés. Vous trouverez des informations
                                        complémentaires dans l'Avis relatif aux cookies et aux technologies de suivi et l'Avis relatif aux réglementations
                                        bancaires.
                                    </p>
                                    <p>
                                        Nous avons défini certains termes utilisés dans notre Politique de confidentialité. Les termes commençant par une majuscule sont définis dans la section Définitions.
                                        Contactez-nous si vous avez des questions sur nos pratiques en matière de respect de la vie privée qui ne sont pas abordées dans la présente Politique de confidentialité.

                                    </p>
                                </div>

                                <h5 className='mb-3' style={{ fontWeight: 'bold' }}>Contact</h5>
                                <p>
                                    Vous pouvez nous contacter pour toute question d'ordre général ou si vous avez un commentaire concernant la présente Politique de confidentialité et les avis
                                    supplémentaires ou sur la manière dont nous traitons vos Données personnelles.
                                </p>
                                <p>
                                    Nous voulons nous assurer que vos questions sont traitées par les bonnes personnes :
                                </p>
                                <p>
                                    <ul>
                                        <li>Cliquez ici pour nous contacter à propos de votre compte Onyo-bt,
                                            d'une transaction ou d'un paiement par carte effectué auprès d'un marchand.</li>
                                        <li>Cliquez ici pour nous contacter à propos de votre compte vidéo.</li>
                                        <li>Cliquez ici pour nous contacter à propos de votre compte conférence.</li>
                                    </ul>
                                </p>
                                <p>
                                    Vous pouvez contacter notre Responsable de la protection des données en ligne ou à l'adresse suivante : info@onyobt.com. Par ailleurs, vous avez la possibilité d'adresser une réclamation
                                    à l'autorité de surveillance en charge de la protection des données dans votre pays.
                                </p>

                                <h5 className='mb-3' style={{ fontWeight: 'bold' }}>
                                    Quelles Données personnelles collectons-nous ?</h5>

                                <p>
                                    Nous collectons des Données personnelles vous concernant lorsque vous visitez nos Sites ou utilisez nos Services,
                                    y compris les informations suivantes :
                                </p>

                                <p>
                                    <ul>
                                        <li>Informations sur l'inscription et l'utilisation : lorsque vous vous inscrivez pour
                                            utiliser nos Services en créant un Compte, nous collectons les Données personnelles nécessaires pour vous proposer et vous fournir les Services que vous demandez. Selon les Services que vous choisissez, nous pouvons vous demander de nous communiquer vos nom, adresse postale, numéro de téléphone, adresse email et informations d'identification pour créer un Compte. Nous pouvons aussi vous demander de nous fournir des
                                            Données personnelles supplémentaires lorsque vous utilisez nos Services</li>
                                    </ul>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Politiques
import Head from 'next/head'
import React from 'react'
import './termconditions.css'
import Link from 'next/link'

const TermsPage = () => {
    return (
        <>

            <Head>
                <title>Terms and Conditions | Aqualite Mattress</title>
            </Head>
            <nav aria-label="breadcrumb" className="pretty-breadcrumb">
                <div className="container">
                    <ol className="breadcrumb align-items-center">
                        <li className="breadcrumb-item">
                            <Link href="/">
                                <span className="breadcrumb-link"> Home</span>
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Term & Conditions
                        </li>
                    </ol>
                </div>
            </nav>
            <div className="termsWrapper">
                <h1 className="title">Terms and Conditions</h1>
                <hr />
                <p className="intro">
                Aqualite Mattress, the creator of these terms and conditions, governs your use of our website, products, and services. By accessing or using our website, you agree to comply with these terms. If you do not agree with these Terms and Conditions, please do not use our website.
                </p>

                {[
                    {
                        heading: "Introduction",
                        content:
                            "When you purchase Aqualite Mattress from Aqualite Mattress, you are agreeing to the terms and conditions that outline the rules and regulations of the transaction. These terms and conditions typically include information about payment methods, delivery options, return policies, and warranties."
                    },
                    {
                        heading: "Intellectual Property Rights",
                        content:
                            "The content, trademarks, logos, and other intellectual property on this website are owned by Aqualite Mattress or its licensors. You may not use, reproduce, distribute, modify, or create derivative works of any content from this website without our prior written consent."
                    },
                    {
                        heading: "Return or Exchange Policies",
                        content:
                            "There is no product return or exchange policy in Aqualite Mattress Make sure to check the return policy before making your purchase so that you are aware of the conditions."
                    },
                    {
                        heading: "Payment Methods",
                        content:
                            "Aqualite Mattress offers a variety of payment methods to make your shopping experience convenient and hassle-free. You can pay using credit cards, debit cards, cash on delivery, or online gateways."
                    },
                    {
                        heading: "Warranties",
                        content:
                            "We offer warranties on our products to guarantee quality and durability. These warranties cover manufacturing defects and structural issues for a specific period. Please inquire about warranty details before purchasing."
                    },
                    {
                        heading: "Delivery Options",
                        content:
                            "Delivery charges and times vary based on location and product. We will try to deliver within the estimated timeframe, but we are not responsible for external delays. Accurate shipping info is required; charges may apply for redelivery."
                    },
                    {
                        heading: "Orders and Payments",
                        content:
                            "By placing an order, you agree to provide accurate information. We reserve the right to cancel orders due to availability, errors, or suspicion of fraud. Payments are due upon order, and we accept cash, checks, bank transfers, and online payments."
                    },
                    {
                        heading: "Changes to Terms and Conditions",
                        content:
                            "We may update these terms at any time. Changes are effective immediately upon posting. It is your responsibility to review them periodically."
                    },
                    {
                        heading: "Privacy",
                        content:
                            "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information."
                    },
                    {
                        heading: "Contact Us",
                        content:
                            `If you have any questions, contact us at 
                            <a href="mailto:info.manmohanfurniture@gmail.com">info.manmohanfurniture@gmail.com</a> 
                            or call <a href="tel:+919250027213">+91-9250027213</a>.`
                    },
                    {
                        heading: "Conclusion",
                        content:
                            "It is important to read and understand our Terms and Conditions before purchasing. This ensures a smooth experience. Reach out to us with any questions. Happy shopping!"
                    },
                ].map((section, index) => (
                    <div key={index} className="section">
                        <h2>{section.heading}</h2>
                        <p dangerouslySetInnerHTML={{ __html: section.content }} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default TermsPage

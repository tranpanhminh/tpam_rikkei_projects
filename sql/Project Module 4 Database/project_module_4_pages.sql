-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_module_4
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `thumbnail_url` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `status_id` int NOT NULL,
  `post_type_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK.post_statuses.pages` (`status_id`),
  KEY `FK.post_types.pages` (`post_type_id`),
  CONSTRAINT `FK.post_statuses.pages` FOREIGN KEY (`status_id`) REFERENCES `post_statuses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK.post_types.pages` FOREIGN KEY (`post_type_id`) REFERENCES `post_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'Billing Terms','<h2><strong>1. Payment Terms</strong></h2>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 07:30:29','2023-10-11 07:51:54'),(3,'Contact Us','<p>If you have any inquiries or need additional information, feel free to reach out to us via email at&nbsp;<strong>support@petshop.com</strong>. We are here to assist you and provide further assistance.</p>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:11:42','2023-10-11 21:11:42'),(4,'Copyright Dispute Policy','<p>We respect the intellectual property rights of others. If you believe that your copyright has been                infringed on our website, please contact us immediately.</p>            <p><strong>To file a copyright infringement claim, please provide us with the following                    information:</strong></p>            <ul>                <li><strong>A physical or electronic&nbsp;signature of the copyright owner or a person authorized to act                        on their behalf.</strong></li>                <li><strong>A description of the copyrighted work that you claim has been infringed.</strong></li>                <li><strong>A description&nbsp;of the location on our website where the infringing material is                        located.</strong></li>                <li><strong>Your contact information, including your name, address, and email address.</strong></li>                <li><strong>A statement that you have a good faith belief that&nbsp;the disputed use&nbsp;is not                        authorized by the copyright owner, its agent, or the law.</strong></li>                <li><strong>A statement that the information in your notice is accurate and&nbsp;that you are authorized                        to act on behalf of the copyright owner.</strong></li>            </ul>            <p>You can contact us at:</p>            <p>help@petshop.com</p>            <p>We will review your claim and take appropriate action. If we determine that your claim is valid, we will                remove the infringing material from our website.</p>            <p><strong>We also reserve the right to terminate the accounts of users who repeatedly infringe on the                    copyrights of others.</strong></p>            <p><strong>Thank you for your cooperation.</strong></p>            <p>Here are some additional things to consider when writing your Copyright Dispute Policy:</p>            <ul>                <li>Be clear about what constitutes copyright infringement.</li>                <li>State how you will handle copyright infringement claims.</li>                <li>Provide a way for copyright owners to contact you.</li>                <li>Reserve the right to terminate accounts of users who repeatedly infringe on copyrights.</li>            </ul>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:11:43','2023-10-11 21:11:43'),(5,'FAQs','<ol>                <li>                    <p><strong>What are your shipping options?</strong> We offer fast and reliable shipping options for                        your convenience. Choose from standard shipping or expedited delivery to receive your pet                        products right at your doorstep.</p>                </li>                <li>                    <p><strong>Do you ship internationally?</strong> Yes, we offer international shipping to select                        countries. Please check our shipping policy or contact our customer support for more details on                        international shipping destinations and rates.</p>                </li>                <li>                    <p><strong>What payment methods do you accept?</strong> We accept major credit cards, such as Visa,                        Mastercard, and American Express. Additionally, we also support secure online payment methods                        like PayPal for a seamless checkout experience.</p>                </li>                <li>                    <p><strong>What is your return policy?</strong> We want you and your pet to be completely satisfied                        with your purchase. If you are not satisfied, you may return eligible items within 30 days of                        delivery for a refund or exchange. Please review our return policy for more information.</p>                </li>                <li>                    <p><strong>How can I track my order?</strong> Once your order is processed and shipped, you will                        receive a tracking number via email. You can use this tracking number to monitor the status of                        your package on our website or the respective shipping carrier\'s website.</p>                </li>                <li>                    <p><strong>Do you offer pet grooming services?</strong> At this time, we focus on providing quality                        pet products. However, we can recommend local pet grooming services in your area. Feel free to                        reach out to our customer support for personalized recommendations.</p>                </li>                <li>                    <p><strong>Are your products safe for pets?</strong> Absolutely! We prioritize the health and safety                        of your furry friends. Our products undergo rigorous quality checks to ensure they meet the                        highest standards. We source from trusted brands that prioritize pet safety.</p>                </li>                <li>                    <p><strong>Can I cancel or modify my order?</strong> We strive to process orders quickly; however,                        if you need to cancel or modify your order, please contact our customer support as soon as                        possible. We will do our best to accommodate your request if the order has not been shipped.</p>                </li>                <li>                    <p><strong>How can I contact customer support?</strong> Our dedicated customer support team is                        available to assist you. You can reach us through email, phone, or live chat. Visit our \\\"Contact                        Us\\\" page for more information on how to get in touch.</p>                </li>                <li>                    <p><strong>Do you have a rewards program?</strong> Yes, we have a pet loyalty program that rewards                        you for your continued support. Earn points on every purchase and redeem them for exclusive                        discounts and rewards. Join our loyalty program to start earning today!</p>                </li>            </ol>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:11:43','2023-10-11 21:11:43'),(6,'Privacy Policy','<h2><strong>Introduction</strong></h2>            <p>We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share                your personal information when you visit our website or use our services.</p>            <h2><strong>What Personal Information Do We Collect?</strong></h2>            <p>We collect the following types of personal information from you:</p>            <ul>                <li><strong>Contact information:</strong>&nbsp;This includes your name, email address, and phone number.                </li>                <li><strong>Transaction information:</strong>&nbsp;This includes information about your purchases, such                    as your order number, shipping address, and payment method.</li>                <li><strong>Technical information:</strong>&nbsp;This includes information about your computer or mobile                    device, such as your IP address, browser type, and operating system.</li>                <li><strong>Usage information:</strong>&nbsp;This includes information about how you use our website or                    services, such as the pages you visit and the links you click.</li>            </ul>            <h2><strong>How Do We Use Your Personal Information?</strong></h2>            <p>We use your personal information for the following purposes:</p>            <ul>                <li><strong>To provide you with our services:</strong>&nbsp;We use your contact information to send you                    order confirmations, shipping notifications, and other updates about your account. We use your                    transaction information to process your orders and to provide you with customer support. We use your                    technical information to improve our website and services. We use your usage information to help us                    understand how our website and services are being used so that we can improve them.</li>                <li><strong>To send you marketing communications:</strong>&nbsp;We may use your contact information to                    send you marketing communications about our products and services. You can opt out of receiving                    marketing communications at any time by clicking the \\\"unsubscribe\\\" link in any marketing email.</li>                <li><strong>To comply with laws and regulations:</strong>&nbsp;We may use your personal information to                    comply with laws and regulations, such as those related to fraud prevention and data security.</li>            </ul>            <h2><strong>Who Do We Share Your Personal Information With?</strong></h2>            <p>We may share your personal information with the following third parties:</p>            <ul>                <li><strong>Our service providers:</strong>&nbsp;We may share your personal information with our service                    providers who help us operate our website and services. These service providers may have access to                    your personal information only to the extent necessary to perform their services.</li>                <li><strong>Legal authorities:</strong>&nbsp;We may share your personal information with legal                    authorities if we are required to do so by law or if we believe that it is necessary to protect our                    rights or the rights of others.</li>            </ul>            <h2><strong>How Do We Protect Your Personal Information?</strong></h2>            <p>We take steps to protect your personal information from unauthorized access, use, disclosure, alteration,                or destruction. These steps include:</p>            <ul>                <li><strong>Physical security:</strong>&nbsp;We store your personal information in secure facilities.                </li>                <li><strong>Technical security:</strong>&nbsp;We use technical measures to protect your personal                    information, such as firewalls and encryption.</li>                <li><strong>Access controls:</strong>&nbsp;We limit access to your personal information to employees who                    need to access it to perform their jobs.</li>            </ul>            <h2><strong>Your Rights</strong></h2>            <p>You have the following rights with respect to your personal information:</p>            <ul>                <li><strong>The right to access:</strong>&nbsp;You have the right to request a copy of your personal                    information.</li>                <li><strong>The right to correct:</strong>&nbsp;You have the right to request that we correct any                    inaccurate or incomplete personal information about you.</li>                <li><strong>The right to delete:</strong>&nbsp;You have the right to request that we delete your                    personal information.</li>                <li><strong>The right to object:</strong>&nbsp;You have the right to object to our processing of your                    personal information.</li>                <li><strong>The right to restrict processing:</strong>&nbsp;You have the right to restrict our                    processing of your personal information.</li>                <li><strong>The right to data portability:</strong>&nbsp;You have the right to request that we transfer                    your personal information to another organization.</li>            </ul>            <p>To exercise any of these rights, please contact us at help@petshop.com</p>            <h2><strong>Changes to This Privacy Policy</strong></h2>            <p>We may update this Privacy Policy from time to time. If we make any significant changes, we will notify                you by email or through a notice on our website.</p>            <h2><strong>Contact Us</strong></h2>            <p>If you have any questions about this Privacy Policy, please contact us at help@petshop.com</p>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:11:44','2023-10-11 21:11:44'),(7,'Refund Policy','<h2>Cancellation & Refund Policy</h2>            <p>If after placing the order, you would want to cancel it, you could do so without incurring any                cancellation charges only in case the product has not been shipped.</p>            <p>In case the product has been shipped, we would not be able to accept any cancellations. The product                is                usually shipped within 1 business day after placing the order.</p>            <p> In case the customer rejects the order during the delivery, cancellation charges of Rs. 100 will be                incurred to cover the shipping costs & return shipping costs. Partial refund will be processed upon                receipt of returned shipment.</p>            <p>In case the customer does not provide the OTP, answer the IVR calls for delivery confirmation &                shipment                is returned, cancellation charges of Rs. 100 will be incurred to cover the shipping costs & return                shipping costs. Partial refund will be processed upon receipt of returned shipment.</p>            <p>Refund is processed within 1-2 business days after receiving the shipment back to our warehouse or after                cancellation in original mode of payment.</p>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:13:20','2023-10-11 21:13:20'),(8,'Return Policy','<p>We want you to be happy with your purchase, so we offer a 30-day return policy. If you are not satisfied      with your purchase for any reason, you can return it for a full refund.</p>  <p><strong>To return an item, please follow these steps:</strong></p>  <ol>      <li>Contact us within 30 days of receiving your purchase.</li>      <li>Provide us with your order number and the reason for your return.</li>      <li>Ship the item back to us at your own expense.</li>      <li>Once we receive the item, we will process your refund.</li>  </ol>  <p><strong>Please note that the following items are not eligible for return:</strong></p>  <ul>      <li>Items that have been used or damaged</li>      <li>Items that are not in their original packaging</li>      <li>Items that are not accompanied by a receipt</li>  </ul>  <p><strong>Refunds will be issued in the same form of payment that was used to make the purchase.</strong>  </p>  <p><strong>If you have any questions about our return policy, please contact us.</strong></p>  <p><strong>Thank you for your business!</strong></p>  <p>Here are some additional things to consider when writing your return policy:</p>  <ul>      <li>Be clear about the time period within which customers can return items.</li>      <li>Specify what conditions the items must be in to be eligible for return.</li>      <li>State whether you will refund the full purchase price or only a portion of it.</li>      <li>Explain how customers can return items.</li>      <li>Include contact information for customers who have questions about your return policy.</li>  </ul>  <p>I hope this helps! Let me know if you have any other questions.</p>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:13:21','2023-10-11 21:13:21'),(9,'Secure Shopping','<p>We understand that your pet\'s health and safety is important to you, and we take security just as                seriously. We use the latest security measures to protect your personal and financial information when                you shop with us.</p>            <p><strong>Here are some of the security measures we use:</strong></p>            <ul>                <li><strong>Secure Socket Layer (SSL) encryption:</strong>&nbsp;This technology encrypts your personal                    and financial information so that it cannot be read by anyone as it travels over the internet.</li>                <li><strong>Firewalls:</strong>&nbsp;These security measures protect our servers from unauthorized                    access.</li>                <li><strong>Intrusion detection systems:</strong>&nbsp;These systems monitor our network for suspicious                    activity.</li>                <li><strong>Employee training:</strong>&nbsp;Our employees are trained on security procedures to help                    protect your information.</li>            </ul>            <p><strong>We are committed to protecting your privacy and security. When you shop with us, you can be                    confident that your information is safe.</strong></p>            <p><strong>Here are some additional tips for secure shopping:</strong></p>            <ul>                <li><strong>Only shop on websites that you trust.</strong></li>                <li><strong>Look for the \\\"https\\\" secure protocol in the website address bar.</strong></li>                <li><strong>Be careful about what information you share online.</strong></li>                <li><strong>Change your passwords regularly.</strong></li>                <li><strong>Be aware of phishing scams.</strong></li>            </ul>            <p><strong>If you have any concerns about security, please contact us.</strong></p>            <p>We hope you have a secure and enjoyable shopping experience with us!</p>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:13:21','2023-10-11 21:13:21'),(10,'Shipping Policy','<h2><strong>Shipping Rates</strong></h2>            <p>We offer free shipping on orders over $50. For orders under $50, shipping costs are as follows:</p>            <ul>                <li><strong>United States:</strong>&nbsp;$5</li>                <li><strong>Canada:</strong>&nbsp;$10</li>                <li><strong>International:</strong>&nbsp;Varies by country</li>            </ul>            <h2><strong>Shipping Times</strong></h2>            <ul>                <li><strong>United States:</strong>&nbsp;3-5 business days</li>                <li><strong>Canada:</strong>&nbsp;5-7 business days</li>                <li><strong>International:</strong>&nbsp;7-10 business days</li>            </ul>            <h2><strong>Shipping Methods</strong></h2>            <p>We ship using USPS, UPS, and FedEx. The specific shipping method used will depend on the weight and                destination of your order.</p>            <h2><strong>Tracking</strong></h2>            <p>Once your order has shipped, you will receive a tracking number via email. You can use this number to                track your order on the shipping carrier\'s website.</p>            <h2><strong>Shipping Restrictions</strong></h2>            <p>We cannot ship to PO boxes or APO/FPO addresses. We also cannot ship to certain countries due to customs                restrictions.</p>            <h2><strong>Shipping Damages</strong></h2>            <p>If your order arrives damaged, please contact us immediately. We will work with you to get a replacement                order shipped out to you as soon as possible.</p>            <h2><strong>Shipping Questions</strong></h2>            <p>If you have any questions about shipping, please contact us. We will be happy to help you.</p>            <p>Here are some additional things to consider when writing your Shipping Policy:</p>            <ul>                <li>Be clear about your shipping rates, shipping times, and shipping methods.</li>                <li>State whether you ship to PO boxes or APO/FPO addresses.</li>                <li>List any shipping restrictions that you have.</li>                <li>Explain what you will do if your order arrives damaged.</li>                <li>Provide a way for customers to contact you with shipping questions.</li>            </ul>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:13:22','2023-10-11 21:13:22'),(11,'Terms Of Service','<p><strong>Welcome to PetShop!</strong></p>            <p><strong>These Terms of Service (the \\\"Terms\\\") govern your use of PetShop (the \\\"Site\\\"). By using the                    Site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the                    Site.</strong></p>            <h2><strong>1. Eligibility</strong></h2>            <p>The Site is intended for use by individuals who are 18 years of age or older. If you are under 18 years                of age, you may use the Site only with the permission of a parent or guardian.</p>            <h2><strong>2. Account</strong></h2>            <p>In order to use certain features of the Site, you may need to create an account. When you create an                account, you will be required to provide certain information, such as your name, email address, and                password. You are responsible for maintaining the confidentiality of your account information and for                all activities that occur under your account.</p>            <h2><strong>3. Content</strong></h2>            <p>The Site may contain content that is owned or licensed by PetShop. This content includes, but is                not limited to, text, images, videos, and software. You may not modify, reproduce, distribute, or create                derivative works of this content without the express written permission of PetShop.</p>            <h2><strong>4. Conduct</strong></h2>            <p>When using the Site, you agree to comply with all applicable laws and regulations. You agree not to:</p>            <ul>                <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory,                    vulgar, obscene, or otherwise objectionable.</li>                <li>Post or transmit any content that infringes the intellectual property rights of others.</li>                <li>Use the Site to harm or exploit others.</li>                <li>Use the Site to spam or otherwise distribute unsolicited content.</li>            </ul>            <h2><strong>5. Changes to the Terms</strong></h2>            <p>PetShop may modify these Terms at any time. If PetShop makes any material changes to these                Terms, PetShop will post a notice on the Site. You are responsible for reviewing the Terms                periodically to ensure that you are aware of any changes.</p>            <h2><strong>6. Termination</strong></h2>            <p>PetShop may terminate your account for any reason, including but not limited to:</p>            <ul>                <li>Breach of these Terms.</li>                <li>Non-payment of fees.</li>                <li>Excessive use of the Site.</li>            </ul>            <h2><strong>7. Governing law</strong></h2>            <p>These Terms are governed by the laws of the State of California, without regard to its conflict of laws                provisions. Any disputes arising out of or relating to these Terms will be resolved exclusively in the                state or federal courts located in Los Angeles County, California.</p>            <h2><strong>8. Entire agreement</strong></h2>            <p>These Terms constitute the entire agreement between you and PetShop with respect to the use of the                Site. These Terms supersede all prior or contemporaneous communications, representations, or agreements,                whether oral or written.</p>            <h2><strong>9. Waiver</strong></h2>            <p>No waiver of any provision of these Terms will be effective unless in writing and signed by an authorized                representative of PetShop.</p>            <h2><strong>10. Severability</strong></h2>            <p>If any provision of these Terms is held to be invalid or unenforceable, such provision will be struck                from these Terms and the remaining provisions will remain in full force and effect.</p>            <h2><strong>11. Contact us</strong></h2>            <p>If you have any questions about these Terms, please contact us at:</p>            <p>PetShop</p>            <p>help@petshop.com</p>','https://www.helpguide.org/wp-content/uploads/2023/02/Health-Benefits-of-Walks-with-Your-Dog-1200x800.jpeg','Admin',2,4,'2023-10-11 21:13:23','2023-10-11 21:13:23');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-06 11:46:18

## Offical website for DLTx Labs Pty Ltd

Brisbane's Blockchain, Web3, Smart Contract and Crypto Developers.

![DLTX Labs](https://github.com/user-attachments/assets/4d9d9e47-51e5-480b-bb97-ce6e3998d9a5)

## Blockchain Australia
DLTx is a proud member of Blockchain Australia

![Blockchain-Australia](https://user-images.githubusercontent.com/8411406/118200117-cbf7ad00-b497-11eb-93b5-6e5ca886789d.png)

## Development

### Libraries

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Usage

To run the project locally

```bash
yarn
yarn dev
```

### CMS

This website uses Strapi to provide the content for the insights. This requires a `Collection Type` to be defined with the following fields:
| Name     | Type               | Description                                                |
|----------|--------------------|------------------------------------------------------------|
| title    | Text               | Title of article                                           |
| slug     | Text               | URL path used to reference article                         |
| category | Enumeration        | Provides grouping of similar articles                      |
| picture  | Media              | Image associated with article (ratio should be around 3:2) |
| abstract | Text               | Text shown on cards                                        |
| content  | Rich text (Blocks) | Main text of article                                       |

### Contact

In order to send an email from the Contact page a basic forwarder using Mailjet has been implemented which is designed to be deployed as a function;
we use DigitalOcean. This ensures that the keys remain private (specified as environment variables `MJ_APIKEY_PUBLIC` and `MJ_APIKEY_PRIVATE`)
and that the destination is fixed so it cannot be used for spamming purposes. The code is as follows:
```text
export async function main(event) {
    try {
        const fields = ["Given Name", "Surname", "Email", "Phone", "Message"];
        const body = fields
            .map(f => [f, f.charAt(0).toLowerCase() + f.replace(" ", "").slice(1)])
            .map(([displayName, objName]) => `<b>${displayName}:</b> ` + (!event[objName] ? "Not provided" : event[objName].toString())).join("<br />");
        const email = {
            "Messages": [{
                "From": { "Email": "website@dltx.io" },
                "To": [{ "Email": "info@dltx.io" }],
                "Subject": "Website Enquiry",
                "HTMLPart": `${body}`
            }]
        };

        const response = await fetch("https://api.mailjet.com/v3.1/send", {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(process.env['MJ_APIKEY_PUBLIC'] + ":" + process.env['MJ_APIKEY_PRIVATE']).toString('base64'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(email)
        });
        if (response?.status != 200)
            throw new Error(`Request failed with status code: ${response?.status ?? "unknown"}`);

        return { statusCode: 200 };
    }
    catch (err) {
        console.log(err);
        return { statusCode: 500 };
    }
}
```  

## PGP Key

Our PGP key for info@dltx.io can be found at https://keys.openpgp.org/vks/v1/by-fingerprint/8E3AEE3D6F28284D04C1F7B1264FA2D8DE4D5ED4

```text
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=EEIz
-----END PGP PUBLIC KEY BLOCK-----
```

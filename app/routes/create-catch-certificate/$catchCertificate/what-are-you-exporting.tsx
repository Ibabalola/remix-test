import { json, LoaderFunction, useLoaderData } from "remix";
import { AccessibleAutocomplete, BackButton, Details, ProductTable, Help } from "../../../components";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import CONFIG from "../../../config";

export const loader: LoaderFunction = async ({ params }) => {
  return json({
    documentNumber: params.catchCertificate,
    config: {
      maxSpeciesLimit: CONFIG.LIMIT_ADD_SPECIES
    }
  });
};

const $catchCertificate = () => {
  const { documentNumber, config } = useLoaderData();
  return (
    <>
      <BackButton href={`/create-catch-certificate/${documentNumber}/add-your-reference`} />
      <div className="govuk-!-padding-top-6">
        <div className="govuk-inset-text govuk-!-margin-top-0">
          <p>Please Note:</p>
          <ul>
            <li>Each product must have at least one landing.</li>
            <li>{`A maximum of ${config.maxSpeciesLimit} landings is allowed per certificate`}.</li>
          </ul>
        </div>
        <h1 className="govuk-heading-xl">What are you exporting?</h1>
        <div className="govuk-tabs" data-module="govuk-tabs">
          <ul className="govuk-tabs__list">
            <li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
              <a className="govuk-tabs__tab" href="#add-products">
                Add products
              </a>
            </li>
            <li className="govuk-tabs__list-item">
              <a className="govuk-tabs__tab" href="#add-favourites">
                Add products from favourites
              </a>
            </li>
          </ul>
          <div className="govuk-tabs__panel" id="add-products">
            <h2 className="govuk-heading-l">Add products</h2>
            <label className="govuk-label govuk-!-font-weight-bold" htmlFor="my-autocomplete">Common name or FAO code</label>
            <div className="govuk-hint">For example, Lobster or LBE</div>
            <AccessibleAutocomplete 
              id="species"
              name="species"
              defaultSelectMessage=""
              defaultValue=""
              nojsValues={['a','b']}
            />
            <Details summary="I cannot find the commodity code">
              <p>Call 0330 159 1989 if the commodity code you need is not shown.</p>
            </Details>
            <div className="govuk-checkboxes__item govuk-!-margin-bottom-4">
              <input className="govuk-checkboxes__input" id="add-to-favourites" name="add-to-favourites" type="checkbox" value="yes"/>
              <label className="govuk-label govuk-checkboxes__label" htmlFor="add-to-favourites">
                Add to product favourites
              </label>
            </div>
            <Button
              label="Cancel"
              type={BUTTON_TYPE.SUBMIT}
              className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
              data-module="govuk-button"
            />
            <Button
              label="Add product"
              type={BUTTON_TYPE.SUBMIT}
              className="govuk-button"
              data-module="govuk-button"
            />
          </div>
          <div className="govuk-tabs__panel govuk-tabs__panel--hidden" id="add-favourites">
            <h2 className="govuk-heading-l">Add products from favourites</h2>
            <label className="govuk-label govuk-!-font-weight-bold" htmlFor="my-autocomplete-2">Product</label>
            <AccessibleAutocomplete 
              id="favourites"
              name="favourites"
              defaultSelectMessage=""
              defaultValue=""
              nojsValues={['a','b']}
            />
            <Details summary="What are product favourites?">
              <p>Product favourites are essential to enable the uploading of products and can also be used to speed up the process of adding products manually.</p>
              <p>You can{" "} 
                <a href="/" aria-label="Opens link for information on fish export service" target="_blank" rel="noopener noreferrer">
                  manage your product favourites<span className="govuk-visually-hidden">(opens in new tab)</span>
                </a> at any time through the favourites link in the main navigation at the top of the page.
              </p>
            </Details>
            <Button
              label="Add Product"
              type={BUTTON_TYPE.SUBMIT}
              className="govuk-button"
              data-module="govuk-button"
            />
          </div>
        </div>
        <h2 className="govuk-heading-l">Your products</h2>
        <ProductTable products={[{
          product: "Product 1",
          commodityCode: "Commodity Code 1"
        }]}/>
        <Button
          label="Save as draft"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
          data-module="govuk-button"
        />
        <Button
          label="Save and continue"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button"
          data-module="govuk-button"
        />
      </div>
      <Help />
    </>
  );
};

export default $catchCertificate;

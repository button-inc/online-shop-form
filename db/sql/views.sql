create or replace view public.application_extract
    as select
        id,
        form_data -> 'businessName' AS business_name,
        form_data -> 'primaryContactName' AS primary_contact_name,
        form_data -> 'primaryContactPosition' AS primary_contact_position,
        form_data -> 'businessPhone' AS business_phone,
        form_data -> 'email' AS email,
        form_data -> 'businessAddress' AS business_address,
        form_data -> 'bcOwned' AS bc_owned,
        form_data -> 'locatedInBc' AS located_in_bc,
        form_data -> 'isCurrentlyOperating' AS is_currently_operating,
        form_data -> 'bcRegistrationID' AS bc_registration_id,
        form_data -> 'federalBusinessNumber' AS federal_business_number,
        form_data -> 'gstNumber' AS gst_number,
        form_data -> 'incomeTaxesFiled' AS income_taxes_filed,
        form_data -> 'revenue2019' AS revenue_2019,
        form_data -> 'workSafeBcRegistered' AS registered_for_worksafe_bc,
        form_data -> 'workSafeBcRegistrationNumber' AS worksafe_bc_registration_number,
        form_data -> 'region' AS region,
        form_data -> 'isIndigenous' AS is_indigenous,
        form_data -> 'cannabisProducts' AS cannabis_products,
        form_data -> 'madeInBc' AS made_in_bc,
        form_data -> 'productionLocation' AS production_location,
        form_data -> 'employees' AS number_of_employees,
        form_data -> 'importExportBusiness' AS import_export_business,
        form_data -> 'existingOnlineStore' AS existing_online_store,
        form_data -> 'onlineStoreUrl' AS online_store_url,
        form_data -> 'existingStoreFeatures' AS existing_store_features,
        form_data -> 'canMeetDeadline' AS can_meet_deadline,
        form_data -> 'otherCovidFunding' AS recieved_other_covid_funding,
        form_data -> 'otherPrograms' AS other_covid_programs,
        form_data -> 'sector' AS sector,
        form_data -> 'sectorOther' AS sector_other,
        form_data -> 'planForFunds' AS plan_for_funds,
        form_data -> 'serviceProviders' AS service_providers,
        sum(sp_cost) AS total_sp_costs,
        sum(sp_cost)*.75 AS grant_portion_sp,
        form_data -> 'customerAcquisition' AS customer_acquisition,
        sum(ca_cost) AS total_ca_costs,
        sum(ca_cost)*.75 AS grant_portion_ca,
        form_data -> 'staffTraining' AS staff_training,
        sum(st_cost) AS total_st_costs,
        sum(st_cost)*.75 AS grant_portion_st,
        sum(sp_cost) + sum(ca_cost) + sum(st_cost) AS total_costs,
        LEAST(7500, sum(sp_cost) + sum(ca_cost) + sum(st_cost)) AS grant_value
    from applications a
    cross join (select
      (jsonb_array_elements(form_data -> 'serviceProviders') ->> 'serviceCost')::numeric as sp_cost,
      (jsonb_array_elements(form_data -> 'customerAcquisition') ->> 'serviceCost')::numeric as ca_cost,
      (jsonb_array_elements(form_data -> 'staffTraining') ->> 'serviceCost')::numeric as st_cost
      from applications) as agg_costs
    group by id;

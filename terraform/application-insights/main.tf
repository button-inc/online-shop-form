# see https://docs.microsoft.com/en-us/azure/azure-monitor/app/monitor-web-app-availability

locals {
  prefix            = "launchonline"
  resource_location = "Canada Central"
}

locals {
  resource_group_name = "${local.prefix}-resource-group"
}

resource "azurerm_application_insights" "this" {
  name                = "${local.prefix}-appinsights"
  location            = local.resource_location
  resource_group_name = local.resource_group_name
  application_type    = "web"
}

resource "azurerm_application_insights_web_test" "this" {
  name                    = "${local.prefix}-appinsights-webtest"
  location                = local.resource_location
  resource_group_name     = local.resource_group_name
  application_insights_id = azurerm_application_insights.this.id
  kind                    = "ping"
  frequency               = 300
  timeout                 = 60
  enabled                 = true
  # Our minimum number of recommended test locations is five
  geo_locations = ["us-tx-sn1-azr", "us-il-ch1-azr", "us-ca-sjc-azr", "us-va-ash-azr", "us-fl-mia-edge"]

  configuration = <<XML
<WebTest Name="WebTest1" Id="ABD48585-0831-40CB-9069-682EA6BB3583" Enabled="True" CssProjectStructure="" CssIteration="" Timeout="0" WorkItemIds="" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010" Description="" CredentialUserName="" CredentialPassword="" PreAuthenticate="True" Proxy="default" StopOnError="False" RecordedResultFile="" ResultsLocale="">
  <Items>
    <Request Method="GET" Guid="a5f10126-e4cd-570d-961c-cea43999a200" Version="1.1" Url="https://launchonline.ca/" ThinkTime="0" Timeout="300" ParseDependentRequests="True" FollowRedirects="True" RecordResult="True" Cache="False" ResponseTimeGoal="0" Encoding="utf-8" ExpectedHttpStatusCode="200" ExpectedResponseUrl="" ReportingName="" IgnoreHttpStatusCode="False" />
  </Items>
</WebTest>
XML
}

resource "azurerm_monitor_metric_alert" "this" {
  name                = "${local.prefix}-metricalert"
  resource_group_name = local.resource_group_name
  scopes              = [azurerm_application_insights_web_test.this.id, azurerm_application_insights.this.id]
  description         = "Availability monitoring"
  enabled             = true
  auto_mitigate       = true
  frequency           = "PT1M"
  severity            = 3

  application_insights_web_test_location_availability_criteria {
    web_test_id           = azurerm_application_insights_web_test.this.id
    component_id          = azurerm_application_insights.this.id
    failed_location_count = 2
  }

  action {
    action_group_id = azurerm_monitor_action_group.this.id
  }
}

resource "azurerm_monitor_action_group" "this" {
  name                = "${local.prefix}-alertaction"
  resource_group_name = local.resource_group_name
  short_name          = "loalert"

  email_receiver {
    name          = "Junmin Ahn"
    email_address = "junmin@button.is"
  }

  email_receiver {
    name          = "Jon Langlois"
    email_address = "jon@button.is"
  }

  email_receiver {
    name          = "Justyn Maglalang"
    email_address = "jmaglalang@alacritycanada.com"
  }

  email_receiver {
    name          = "Stephanie"
    email_address = "stephanie@jetstream.agency"
  }
}

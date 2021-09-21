locals {
  prefix            = "launchonline"
  resource_location = "Canada Central"
}

resource "azurerm_resource_group" "this" {
  name     = "${local.prefix}-resource-group"
  location = local.resource_location
}

module "aks" {
  source              = "./modules/aks"
  resource_group_name = azurerm_resource_group.this.name
  location            = local.resource_location
  client_id           = var.client_id
  client_secret       = var.client_secret
  prefix              = local.prefix
  vnet_subnet_id      = azurerm_subnet.this.id
  agents_size         = "Standard_F4"
  agents_min_count    = 1
  agents_max_count    = 20

  depends_on = [azurerm_resource_group.this, azurerm_subnet.this]
}

data "azurerm_log_analytics_workspace" "this" {
  name                = "${local.prefix}-workspace"
  resource_group_name = azurerm_resource_group.this.name

  depends_on = [module.aks]
}

module "postgresql_dev" {
  source              = "./modules/postgresql"
  prefix              = "${local.prefix}-dev"
  resource_group_name = azurerm_resource_group.this.name
  location            = local.resource_location
  sku_name            = "GP_Gen4_1"
  storage_mb          = 5120
  admin_username      = "rootadmin"
  admin_password      = var.postgresql_password_dev
  vnet_subnet_id      = azurerm_subnet.this.id
  create_read_replica = false

  depends_on = [module.aks]
}

module "postgresql_test" {
  source              = "./modules/postgresql"
  prefix              = "${local.prefix}-test"
  resource_group_name = azurerm_resource_group.this.name
  location            = local.resource_location
  sku_name            = "GP_Gen4_1"
  storage_mb          = 5120
  admin_username      = "rootadmin"
  admin_password      = var.postgresql_password_test
  vnet_subnet_id      = azurerm_subnet.this.id
  create_read_replica = true

  depends_on = [module.aks]
}

module "postgresql_prod" {
  source              = "./modules/postgresql"
  prefix              = "${local.prefix}-prod"
  resource_group_name = azurerm_resource_group.this.name
  location            = local.resource_location
  sku_name            = "GP_Gen4_1"
  storage_mb          = 10240
  admin_username      = "rootadmin"
  admin_password      = var.postgresql_password_prod
  vnet_subnet_id      = azurerm_subnet.this.id
  create_read_replica = true

  depends_on = [module.aks]
}

module "container_registry" {
  source              = "./modules/container-registry"
  name                = "${local.prefix}acr"
  resource_group_name = azurerm_resource_group.this.name
  location            = local.resource_location

  depends_on = [azurerm_resource_group.this]
}

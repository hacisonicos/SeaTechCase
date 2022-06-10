# SeaTechCase

# Migration

Visual Studio Package Manager Console üzerinden, Infrastructure katmanında
```
add-migration FirstMigration -Context DataContext
update-database -Context DataContext
```

# Migration sonrası


- Visual Studio'da, Solution->Set Startup Projects
- **Multiple project startup** aktif edilir
- seatech.webuireact ve SeaTech.WebApi Projelerinin Action'ları Start olarak seçilir
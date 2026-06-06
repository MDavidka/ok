import { NextResponse } from "next/server";

interface Column {
  name: string;
  type: string;
  isPrimary: boolean;
  isNullable: boolean;
  isUnique: boolean;
  mockType: string; // 'name' | 'email' | 'phone' | 'company' | 'uuid' | 'date' | 'number' | 'boolean' | 'none'
}

interface GenerateRequest {
  tableName: string;
  dialect: "postgres" | "mysql" | "sqlite";
  columns: Column[];
  rowCount: number;
}

// Simple deterministic helper to generate random-like but realistic mock data based on type
function generateMockValue(type: string, index: number, columnName: string) {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "devsuite.io", "sandbox.dev", "techcorp.com", "startup.co"];
  const companies = ["Stripe", "Vercel", "Supabase", "Prisma", "Linear", "Retool", "Clerk", "Tailwind Labs", "Sentry", "PostHog"];
  const jobs = ["Software Engineer", "Product Manager", "UI Designer", "DevOps Engineer", "Data Scientist", "CTO", "CEO", "HR Specialist"];

  const fName = firstNames[(index + 3) % firstNames.length];
  const lName = lastNames[(index + 7) % lastNames.length];
  const domain = domains[(index * 2) % domains.length];
  const company = companies[(index + 1) % companies.length];

  switch (type) {
    case "name":
      return `'${fName} ${lName}'`;
    case "email":
      return `'${fName.toLowerCase()}.${lName.toLowerCase()}${index + 1}@${domain}'`;
    case "phone":
      return `'+1-555-${String(100 + index).padStart(3, "0")}-${String(1000 + index * 3).padStart(4, "0")}'`;
    case "company":
      return `'${company} Inc.'`;
    case "job":
      return `'${jobs[index % jobs.length]}'`;
    case "uuid":
      // Generate a mock v4 UUID
      const hex = "0123456789abcdef";
      let uuid = "";
      for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
          uuid += "-";
        } else if (i === 14) {
          uuid += "4";
        } else {
          uuid += hex[Math.floor((index * 17 + i * 31) % 16)];
        }
      }
      return `'${uuid}'`;
    case "date":
      const date = new Date(2023, 0, 1);
      date.setDate(date.getDate() + index * 4);
      return `'${date.toISOString().slice(0, 19).replace("T", " ")}'`;
    case "number":
      return `${Math.floor((index * 137 + 42) % 1000)}`;
    case "boolean":
      return index % 2 === 0 ? "true" : "false";
    default:
      if (columnName.toLowerCase().includes("id")) {
        return `${index + 1}`;
      }
      return "'N/A'";
  }
}

export async function POST(req: Request) {
  try {
    const body: GenerateRequest = await req.json();
    const { tableName, dialect, columns, rowCount } = body;

    if (!tableName || !columns || columns.length === 0) {
      return NextResponse.json(
        { error: "Missing required parameters: tableName and columns are required." },
        { status: 400 }
      );
    }

    // 1. Generate CREATE TABLE DDL
    let ddl = "";
    if (dialect === "postgres") {
      ddl += `CREATE TABLE IF NOT EXISTS "${tableName}" (\n`;
    } else if (dialect === "mysql") {
      ddl += `CREATE TABLE IF NOT EXISTS \`${tableName}\` (\n`;
    } else {
      ddl += `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
    }

    const columnDefs = columns.map((col) => {
      let def = "";
      const colName = dialect === "postgres" ? `"${col.name}"` : dialect === "mysql" ? `\`${col.name}\`` : col.name;
      
      let typeStr = col.type;
      // Adjust types based on dialect
      if (dialect === "postgres") {
        if (col.type === "INT") typeStr = "SERIAL";
        if (col.type === "VARCHAR") typeStr = "VARCHAR(255)";
        if (col.type === "DATETIME") typeStr = "TIMESTAMP WITH TIME ZONE";
      } else if (dialect === "mysql") {
        if (col.type === "INT" && col.isPrimary) typeStr = "INT AUTO_INCREMENT";
        if (col.type === "VARCHAR") typeStr = "VARCHAR(255)";
        if (col.type === "UUID") typeStr = "VARCHAR(36)";
      } else if (dialect === "sqlite") {
        if (col.type === "INT" && col.isPrimary) typeStr = "INTEGER PRIMARY KEY AUTOINCREMENT";
        if (col.type === "VARCHAR") typeStr = "TEXT";
        if (col.type === "UUID") typeStr = "TEXT";
      }

      def += `  ${colName} ${typeStr}`;

      // Primary Key (if not handled by SQLite AUTOINCREMENT)
      if (col.isPrimary) {
        if (dialect !== "sqlite" || col.type !== "INT") {
          def += " PRIMARY KEY";
        }
      }

      if (!col.isNullable && !col.isPrimary) {
        def += " NOT NULL";
      }

      if (col.isUnique && !col.isPrimary) {
        def += " UNIQUE";
      }

      return def;
    });

    ddl += columnDefs.join(",\n");
    ddl += "\n);";

    // 2. Generate INSERT Statements
    const inserts: string[] = [];
    const insertCols = columns.filter((col) => {
      // Skip auto increment columns for Postgres/MySQL/SQLite
      if (col.isPrimary && col.type === "INT") {
        return false;
      }
      return true;
    });

    const colNamesStr = insertCols
      .map((col) => (dialect === "postgres" ? `"${col.name}"` : dialect === "mysql" ? `\`${col.name}\`` : col.name))
      .join(", ");

    for (let i = 0; i < Math.min(rowCount, 100); i++) {
      const values = insertCols.map((col) => {
        return generateMockValue(col.mockType, i, col.name);
      });
      inserts.push(`INSERT INTO ${dialect === "postgres" ? `"${tableName}"` : dialect === "mysql" ? `\`${tableName}\`` : tableName} (${colNamesStr}) VALUES (${values.join(", ")});`);
    }

    // 3. Generate JSON Preview Data
    const jsonPreview: any[] = [];
    for (let i = 0; i < Math.min(rowCount, 10); i++) {
      const row: any = {};
      columns.forEach((col) => {
        let val: any = generateMockValue(col.mockType, i, col.name);
        // Strip single quotes for JSON output
        if (typeof val === "string" && val.startsWith("'") && val.endsWith("'")) {
          val = val.substring(1, val.length - 1);
        } else if (val === "true") {
          val = true;
        } else if (val === "false") {
          val = false;
        } else if (!isNaN(Number(val))) {
          val = Number(val);
        }
        row[col.name] = val;
      });
      jsonPreview.push(row);
    }

    return NextResponse.json({
      ddl,
      inserts: inserts.join("\n"),
      fullSql: `-- Table Schema definition\n${ddl}\n\n-- Realistic Mock Datasets (${rowCount} rows generated)\n${inserts.join("\n")}`,
      jsonPreview,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

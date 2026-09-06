-- Active: 1788715250129@@127.0.0.1@3306@controle_album
Delimiter $$

Drop Procedure if exists acessar$$
Create Procedure acessar(pLogin varchar(15), pSenha varchar(64))
begin
	declare qtd int default 0;
    
    Select count(*) into qtd from cliente
	where cd_cpf_cliente = pLogin and nm_senha = md5(pSenha);
    
    if (qtd = 0) then
		signal sqlstate '45000' set message_text = 'Login e/ou senha inválidos!';
    else
		Select cd_cpf_cliente, nm_cliente from cliente
		where cd_cpf_cliente = pLogin and nm_senha = md5(pSenha);
    end if;
	
end$$

Drop Procedure if exists progresso$$
Create Procedure progresso(pLogin varchar(15))
begin
	Select 
	(Select count(*) from figura) as total,
	(Select count(*) from album where cd_cpf_cliente = pLogin and ic_possui= 1) as possui;
end$$

Drop Procedure if exists progresso$$
Create Procedure progresso(pLogin varchar(15))
begin
	Declare total int default 0;
    Declare possui int default 0;
    
	Select count(*) into total from figura;
    Select count(*) into possui from album where cd_cpf_cliente = pLogin and ic_possui= 1;
    
    Select total, possui;
end$$

Drop Procedure if exists listarAlbum$$
Create Procedure listarAlbum(pLogin varchar(15))
begin
	Select a.cd_figura, f.nm_figura, a.ic_possui, f.cd_time, t.nm_time
		from album a join figura f on (a.cd_figura = f.cd_figura)
        join time t on (f.cd_time = t.cd_time)
		where a.cd_cpf_cliente = pLogin order by abs(a.cd_figura); 
end$$


Drop Procedure if exists listarTimes$$
Create Procedure listarTimes()
begin
	Select cd_time, nm_time from time order by nm_time;
end$$

Drop Procedure if exists alterarSituacaoFigurinha$$
Create Procedure alterarSituacaoFigurinha(pLogin varchar(15), pCodigoFigura int, pSituacao bool)
begin
	Update album 
		set ic_possui = pSituacao 
	where 
		cd_cpf_cliente = pLogin and cd_figura = pCodigoFigura; 
	if(pSituacao = false) then  delete from figura_repetida where cd_cpf_cliente = pLogin and cd_figura = pCodigoFigura;
    else
		insert into figura_repetida(cd_cpf_cliente, cd_figura, qt_repetidas) values (pLogin, pCodigoFigura, '1') ON duplicate key update  qt_repetidas = '1';
	end if;
end$$

drop procedure if exists listarRepetidas$$
create procedure listarRepetidas(pLogin varchar(15))
begin
	select cd_figura, qt_repetidas from figura_repetida;
end$$

drop procedure if exists atualizarQuantidade$$
create procedure atualizarQuantidade(pLogin varchar(15), pCodigoFigura int, pQtdFigura int)
begin
	if (pQtdFigura = 0) then
    delete from figura_repetida where cd_cpf_cliente = pLogin and cd_figura = pCodigoFigura;
	Update album set ic_possui = 0 where cd_cpf_cliente = pLogin and cd_figura = pCodigoFigura; 
    else
		insert into figura_repetida(cd_cpf_cliente, cd_figura, qt_repetidas) values (pLogin, pCodigoFigura, pQtdFigura) ON duplicate key update  qt_repetidas = pQtdFigura;
        update album set ic_possui = 1 where cd_cpf_cliente = pLogin and cd_figura = pCodigoFigura; 
	end if;
end$$

drop procedure if exists criarCliente$$
create procedure criarCliente(pCpf varchar(15), pNome varchar(100), pSenha varchar(64))
begin
	declare done boolean default false;
	declare figuraId int;
	declare figuras cursor for select cd_figura from figura;
	declare continue handler for not found set done = true;

	insert into cliente(cd_cpf_cliente, nm_cliente, nm_senha) values (pCpf, pNome, pSenha);

	open figuras;
	album_loop: loop
		fetch figuras into figuraId;
		if done then
			leave album_loop;
		end if;

		insert into album(cd_cpf_cliente, cd_figura, ic_possui)
		values (pCpf, figuraId, 0);
	end loop;
	close figuras;
END$$


Delimiter ;